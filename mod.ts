import { type ClassValue, seseg } from "@codeandmoney/seseg";

// Utility types

type UnionToIntersection<U> = (U extends any ? ( k: U ) => void : never) extends ( k: infer I ) => void ? I : never;
type StringToBoolean<T> = T extends "true" | "false" ? boolean : T;

// bato
type BatoConfigBase = { base?: ClassValue };
type BatoVariantShape = Record<string, Record<string, ClassValue>>;
type ClassProp =
  | { class: ClassValue; className?: never }
  | { class?: never; className: ClassValue }
  | { class?: never; className?: never };
type BatoVariantSchema<V extends BatoVariantShape> = {
  [Variant in keyof V]?: StringToBoolean<keyof V[Variant]> | undefined | "unset";
};

type BatoProps<T> = T extends ( props: infer U ) => string ? Omit<U extends undefined ? never : U, keyof ClassProp>
  : never;

type Bato = <_ extends "iternal use only", V>(
  config: V extends BatoVariantShape ? BatoConfigBase & {
      variants?: V;

      // TODO: compoundVariants should type error when trying to compound incompatible variants
      compoundVariants?: (V extends BatoVariantShape ?
          & (
            | BatoVariantSchema<V>
            | {
              [Variant in keyof V]?:
                | StringToBoolean<keyof V[Variant]>
                | StringToBoolean<keyof V[Variant]>[]
                | undefined;
            }
          )
          & ClassProp
        : ClassProp)[];

      // TODO: defaultVariants should type error when trying to default incompatible variants
      defaultVariants?: BatoVariantSchema<V>;

      incompatible?: {
        [Variant in keyof V]?: {
          [Key in keyof V[Variant]]?: {
            [IncompatibleVariant in Exclude<keyof V, Variant>]?: readonly (keyof V[IncompatibleVariant])[];
          };
        };
      };
    }
    : BatoConfigBase & { variants?: never; compoundVariants?: never; defaultVariants?: never; incompatible?: never },
) => ( props?: V extends BatoVariantShape ? BatoVariantSchema<V> & ClassProp : ClassProp ) => string;

// compose
type Compose = <T extends ReturnType<Bato>[]>( ...components: [ ...T ] ) => (
  props?: (UnionToIntersection<{ [K in keyof T]: BatoProps<T[K]> }[number]> | undefined) & ClassProp,
) => string;

// defineConfig
interface BatoConfigOptions {
  hooks?: {
    /**
     * Returns the completed string of concatenated classes/classNames.
     */
    onComplete?: ( className: string ) => string;
  };
}

// assemble
function assemble( options?: BatoConfigOptions ): { compose: Compose; cx: typeof seseg; bato: Bato } {
  const cx: typeof seseg = ( ...inputs ) => {
    if ( typeof options?.hooks?.onComplete === "function" ) {
      return options?.hooks.onComplete( seseg( inputs ) );
    }

    return seseg( inputs );
  };

  const bato: Bato = ( config ) => {
    if ( !config ) {
      return ( props?: ClassProp ): string => cx( props?.class, props?.className );
    }

    if ( !config.variants ) {
      return ( props?: ClassProp ): string => cx( config.base, props?.class, props?.className );
    }

    return function variants( props ): string {
      let classes = cx( config.base );
      let tmp: any;

      if ( !props ) {
        if ( !( "defaultVariants" in config && config.defaultVariants ) ) {
          return classes;
        }

        for ( const variant of Object.keys( config.variants! ) as (keyof typeof config.variants)[] ) {
          const key = toString( config.defaultVariants[variant] );

          if ( ( tmp = config.variants?.[variant][key] ) ) {
            classes = cx( classes, tmp );
          }
        }

        if ( !config.compoundVariants ) {
          return classes;
        }

        let adding = true;

        for ( const compound of config.compoundVariants ) {
          for ( const prop in compound ) {
            if ( prop === "class" || prop === "className" ) {
              continue;
            }

            if ( config.defaultVariants[prop] !== compound[prop] ) {
              adding = false;
              break;
            }
          }

          if ( adding ) {
            classes = cx( classes, compound.class, compound.className );
          }

          adding = true;
        }

        return classes;
      }

      // incompatible
      if ( config.incompatible ) {
        for ( const key of Object.keys( config.incompatible ) ) {
          if ( key in props ) {
            // @ts-expect-error: no inference needed
            if ( props[key] in config.incompatible[key] ) {
              // @ts-expect-error: kinda imposible to make inference right
              const incompatibles = config.incompatible[key][props[key]] as object;

              for ( const incompatible of Object.keys( incompatibles ) ) {
                // @ts-expect-error: no inference needed
                if ( incompatible in props && incompatibles[incompatible].includes( props[incompatible] ) ) {
                  throw new Error(
                    // @ts-expect-error: no inference needed
                    // deno-fmt-ignore
                    `You called variants with incompatible variatns: { ${ key }: "${ props[key] }"} incompatible with {  ${incompatible}: "${props[incompatible]}"}`,
                  );
                }
              }
            }
          }
        }
      }

      // TODO: rewrite to go through variants from props - not from config
      for ( const variant of Object.keys( config.variants! ) as (keyof typeof config.variants)[] ) {
        const value = toString( props[variant as keyof typeof props] ) ||
          toString( config.defaultVariants?.[variant] );

        if ( ( tmp = config.variants?.[variant][value] ) ) {
          classes = cx( classes, tmp );
        }
      }

      if ( !config.compoundVariants ) {
        return cx( classes, props.class, props.className );
      }

      let adding = true;

      for ( const compound of config.compoundVariants ) {
        for ( const prop in compound ) {
          if ( prop === "class" || prop === "className" ) {
            continue;
          }

          if ( Array.isArray( compound[prop] ) ) {
            if ( !( compound[prop] as any[] ).includes( props[prop as keyof typeof props] ) ) {
              adding = false;
            }
          } else {
            const some = prop in props ? props[prop] : config.defaultVariants?.[prop];

            if ( some !== compound[prop] ) {
              adding = false;
              break;
            }
          }
        }

        if ( adding ) {
          classes = cx( classes, compound.class, compound.className );
        }

        adding = true;
      }

      return cx( classes, props.class, props.className );
    };
  };

  const compose: Compose = ( ...components ) => ( props ) => {
    const { class: clss, className, ...rest } = props ?? {};
    let tmp: string;
    let classes = "";

    for ( const component of components ) {
      if ( ( tmp = component( rest ) ) ) {
        classes = `${classes} ${tmp.trim()}`;
      }
    }

    return cx( classes, clss, className );
  };

  return { cx, bato, compose };
}

function toString( value: any ): string {
  if ( typeof value === "boolean" || typeof value === "number" ) {
    return value.toString();
  }

  if ( !value ) {
    return "";
  }

  return value.toString();
}

const assmbled: {
  compose: Compose;
  cx: typeof seseg;
  bato: Bato;
} = assemble();

const bato: Bato = assmbled.bato;
const cx: typeof seseg = assmbled.cx;
const compose: Compose = assmbled.compose;

export type { Bato, BatoConfigOptions, BatoProps, ClassValue, Compose };
export { assemble, bato, compose, cx };
