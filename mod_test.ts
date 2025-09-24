import { classes } from "@codeandmoney/seseg";
import { describe, test } from "@std/testing/bdd";
import { expect } from "@std/expect";
import { assemble, bato, type BatoProps, compose } from "@codeandmoney/bato";

describe("bato", () => {
  describe("without base", () => {
    describe("without anything", () => {
      test("empty", () => {
        // @ts-expect-error must be a type error
        const example = bato();
        expect( example() ).toBe( "" );
        expect(
          example( {
            // @ts-expect-error must be a type error
            aCheekyInvalidProp: "lol",
          } ),
        ).toBe( "" );
        expect( example( { class: "adhoc-class" } ) ).toBe( "adhoc-class" );
        expect( example( { className: "adhoc-className" } ) ).toBe(
          "adhoc-className",
        );
        expect(
          example( {
            className: "adhoc-className",
            // @ts-expect-error must be a type error
            class: "adhoc-class",
          } ),
        ).toBe( "adhoc-class adhoc-className" );
        expect(
          example( {
            class: "adhoc-class",
            // @ts-expect-error must be a type error
            className: "adhoc-className",
          } ),
        ).toBe( "adhoc-class adhoc-className" );
      });

      test("undefined", () => {
        // @ts-expect-error must be a type error
        const example = bato( undefined );
        expect( example() ).toBe( "" );
        expect(
          example( {
            // @ts-expect-error must be a type error
            aCheekyInvalidProp: "lol",
          } ),
        ).toBe( "" );
        expect( example( { class: "adhoc-class" } ) ).toBe( "adhoc-class" );
        expect( example( { className: "adhoc-className" } ) ).toBe(
          "adhoc-className",
        );
        expect(
          example( {
            class: "adhoc-class",
            // @ts-expect-error must be a type error
            className: "adhoc-className",
          } ),
        ).toBe( "adhoc-class adhoc-className" );

        expect(
          example( {
            className: "adhoc-className",
            // @ts-expect-error must be a type error
            class: "adhoc-class",
          } ),
        ).toBe( "adhoc-class adhoc-className" );
      });

      test("null", () => {
        const example = bato(
          // @ts-expect-error must be a type error
          null,
        );
        expect( example() ).toBe( "" );
        expect(
          example( {
            // @ts-expect-error must be a type error
            aCheekyInvalidProp: "lol",
          } ),
        ).toBe( "" );
        expect( example( { class: "adhoc-class" } ) ).toBe( "adhoc-class" );
        expect( example( { className: "adhoc-className" } ) ).toBe(
          "adhoc-className",
        );
        expect(
          example( {
            class: "adhoc-class",
            // @ts-expect-error must be a type error
            className: "adhoc-className",
          } ),
        ).toBe( "adhoc-class adhoc-className" );
        expect(
          example( {
            className: "adhoc-className",
            // @ts-expect-error must be a type error
            class: "adhoc-class",
          } ),
        ).toBe( "adhoc-class adhoc-className" );
      });
    });

    describe("objects", () => {
      const buttonOnlyBase = bato( {
        base: {},
      } );
      const buttonOnlyVariants = bato( {
        variants: {},
      } );
      const buttonOnlyCompoundVariants = bato( {
        // @ts-expect-error must be a type error
        compoundVariants: [],
      } );
      const buttonOnlyDefaultVariants = bato( {
        // @ts-expect-error must be a type error
        defaultVariants: {},
      } );

      const buttonAllEmptyObjects = bato( {
        base: {},
        variants: {},
        compoundVariants: [],
        defaultVariants: {},
      } );

      const buttonOnlyBaseNull = bato( {
        base: null,
      } );

      const buttonOnlyVariantsNull = bato( {
        // @ts-expect-error must be a type error
        variants: null,
      } );
      const buttonOnlyCompoundVariantsNull = bato( {
        // @ts-expect-error must be a type error
        compoundVariants: null,
      } );
      const buttonOnlyDefaultVariantsNull = bato( {
        // @ts-expect-error must be a type error
        defaultVariants: null,
      } );

      const buttonAllEmptyObjectsNull = bato( {
        base: null,
        // @ts-expect-error must be a type error
        variants: null,
        // @ts-expect-error must be a type error
        compoundVariants: null,
        // @ts-expect-error must be a type error
        defaultVariants: null,
      } );

      type ButtonWithoutDefaultsWithoutBaseProps =
        | BatoProps<typeof buttonOnlyBase>
        | BatoProps<typeof buttonOnlyVariants>
        | BatoProps<typeof buttonOnlyCompoundVariants>
        | BatoProps<typeof buttonOnlyDefaultVariants>
        | BatoProps<typeof buttonAllEmptyObjects>
        | BatoProps<typeof buttonOnlyBaseNull>;

      const cases: [ ButtonWithoutDefaultsWithoutBaseProps, string ][] = [
        // @ts-expect-error must be a type error
        [ undefined, "" ],
        [ {}, "" ],
        [ { aCheekyInvalidProp: "lol" } as ButtonWithoutDefaultsWithoutBaseProps, "" ],
        [ { intent: "secondary" }, "" ],
        [ { size: "small" }, "" ],
        [ { disabled: true }, "" ],
        [ { intent: "secondary", size: "unset" }, "" ],
        [ { intent: "secondary", size: undefined }, "" ],
        [ { intent: "danger", size: "medium" }, "" ],
        [ { intent: "warning", size: "large" }, "" ],
        [ { intent: "warning", size: "large", disabled: true }, "" ],
        [ { intent: "primary", m: 0 }, "" ],
        [ { intent: "primary", m: 1 }, "" ],
        [ { intent: "primary", m: 1, class: "adhoc-class" }, "adhoc-class" ],
        [ { intent: "primary", m: 1, className: "adhoc-classname" }, "adhoc-classname" ],
      ];

      cases.forEach( ( [ options, expected ] ) => {
        test(`returns ${expected}`, () => {
          expect( buttonOnlyBase( options ) ).toBe( expected );
          expect( buttonOnlyVariants( options ) ).toBe( expected );
          expect( buttonOnlyCompoundVariants( options ) ).toBe( expected );
          expect( buttonOnlyDefaultVariants( options ) ).toBe( expected );
          expect( buttonAllEmptyObjects( options ) ).toBe( expected );
          expect( buttonOnlyBaseNull( options ) ).toBe( expected );
          expect( buttonOnlyVariantsNull( options ) ).toBe( expected );
          expect( buttonOnlyCompoundVariantsNull( options ) ).toBe( expected );
          expect( buttonOnlyDefaultVariantsNull( options ) ).toBe( expected );
          expect( buttonAllEmptyObjectsNull( options ) ).toBe( expected );
        });
      } );
    });

    describe("without defaults", () => {
      const buttonWithoutBaseWithoutDefaultsString = bato( {
        variants: {
          intent: {
            primary: "button--primary bg-blue-500 text-white border-transparent hover:bg-blue-600",
            secondary: "button--secondary bg-white text-gray-800 border-gray-400 hover:bg-gray-100",
            warning: "button--warning bg-yellow-500 border-transparent hover:bg-yellow-600",
            danger: [ "button--danger", [ 1 && "bg-red-500", {
              baz: false,
              bat: null,
            }, [ "text-white", [ "border-transparent" ] ] ], "hover:bg-red-600" ],
          },
          disabled: {
            true: "button--disabled opacity-050 cursor-not-allowed",
            false: "button--enabled cursor-pointer",
          },
          size: {
            small: "button--small text-sm py-1 px-2",
            medium: "button--medium text-base py-2 px-4",
            large: "button--large text-lg py-2.5 px-4",
          },
          m: {
            0: "m-0",
            1: "m-1",
          },
        },
        compoundVariants: [
          {
            intent: "primary",
            size: "medium",
            class: "button--primary-medium uppercase",
          },
          {
            intent: "warning",
            disabled: false,
            class: "button--warning-enabled text-gray-800",
          },
          {
            intent: "warning",
            disabled: true,
            class: [ "button--warning-disabled", [ 1 && "text-black", {
              baz: false,
              bat: null,
            } ] ],
          },
        ],
      } );
      const buttonWithoutBaseWithoutDefaultsWithClassNameString = bato( {
        variants: {
          intent: {
            primary: "button--primary bg-blue-500 text-white border-transparent hover:bg-blue-600",
            secondary: "button--secondary bg-white text-gray-800 border-gray-400 hover:bg-gray-100",
            warning: "button--warning bg-yellow-500 border-transparent hover:bg-yellow-600",
            danger: [ "button--danger", [ 1 && "bg-red-500", {
              baz: false,
              bat: null,
            }, [ "text-white", [ "border-transparent" ] ] ], "hover:bg-red-600" ],
          },
          disabled: {
            true: "button--disabled opacity-050 cursor-not-allowed",
            false: "button--enabled cursor-pointer",
          },
          size: {
            small: "button--small text-sm py-1 px-2",
            medium: "button--medium text-base py-2 px-4",
            large: "button--large text-lg py-2.5 px-4",
          },
          m: {
            0: "m-0",
            1: "m-1",
          },
        },
        compoundVariants: [
          {
            intent: "primary",
            size: "medium",
            className: "button--primary-medium uppercase",
          },
          {
            intent: "warning",
            disabled: false,
            className: "button--warning-enabled text-gray-800",
          },
          {
            intent: "warning",
            disabled: true,
            className: [ "button--warning-disabled", [ 1 && "text-black", {
              baz: false,
              bat: null,
            } ] ],
          },
        ],
      } );
      const buttonWithoutBaseWithoutDefaultsArray = bato( {
        variants: {
          intent: {
            primary: [
              "button--primary",
              "bg-blue-500",
              "text-white",
              "border-transparent",
              "hover:bg-blue-600",
            ],
            secondary: [
              "button--secondary",
              "bg-white",
              "text-gray-800",
              "border-gray-400",
              "hover:bg-gray-100",
            ],
            warning: [
              "button--warning",
              "bg-yellow-500",
              "border-transparent",
              "hover:bg-yellow-600",
            ],
            danger: [ "button--danger", [ 1 && "bg-red-500", {
              baz: false,
              bat: null,
            }, [ "text-white", [ "border-transparent" ] ] ], "hover:bg-red-600" ],
          },
          disabled: {
            true: [ "button--disabled", "opacity-050", "cursor-not-allowed" ],
            false: [ "button--enabled", "cursor-pointer" ],
          },
          size: {
            small: [ "button--small", "text-sm", "py-1", "px-2" ],
            medium: [ "button--medium", "text-base", "py-2", "px-4" ],
            large: [ "button--large", "text-lg", "py-2.5", "px-4" ],
          },
          m: {
            0: "m-0",
            1: "m-1",
          },
        },
        compoundVariants: [
          {
            intent: "primary",
            size: "medium",
            class: [ "button--primary-medium", "uppercase" ],
          },
          {
            intent: "warning",
            disabled: false,
            class: [ "button--warning-enabled", "text-gray-800" ],
          },
          {
            intent: "warning",
            disabled: true,
            class: [ "button--warning-disabled", [ 1 && "text-black", {
              baz: false,
              bat: null,
            } ] ],
          },
        ],
      } );
      const buttonWithoutBaseWithoutDefaultsWithClassNameArray = bato( {
        variants: {
          intent: {
            primary: [
              "button--primary",
              "bg-blue-500",
              "text-white",
              "border-transparent",
              "hover:bg-blue-600",
            ],
            secondary: [
              "button--secondary",
              "bg-white",
              "text-gray-800",
              "border-gray-400",
              "hover:bg-gray-100",
            ],
            warning: [
              "button--warning",
              "bg-yellow-500",
              "border-transparent",
              "hover:bg-yellow-600",
            ],
            danger: [ "button--danger", [ 1 && "bg-red-500", {
              baz: false,
              bat: null,
            }, [ "text-white", [ "border-transparent" ] ] ], "hover:bg-red-600" ],
          },
          disabled: {
            true: [ "button--disabled", "opacity-050", "cursor-not-allowed" ],
            false: [ "button--enabled", "cursor-pointer" ],
          },
          size: {
            small: [ "button--small", "text-sm", "py-1", "px-2" ],
            medium: [ "button--medium", "text-base", "py-2", "px-4" ],
            large: [ "button--large", "text-lg", "py-2.5", "px-4" ],
          },
          m: {
            0: "m-0",
            1: "m-1",
          },
        },
        compoundVariants: [
          {
            intent: "primary",
            size: "medium",
            className: [ "button--primary-medium", "uppercase" ],
          },
          {
            intent: "warning",
            disabled: false,
            className: [ "button--warning-enabled", "text-gray-800" ],
          },
          {
            intent: "warning",
            disabled: true,
            className: [ "button--warning-disabled", [ 1 && "text-black", {
              baz: false,
              bat: null,
            } ] ],
          },
        ],
      } );

      type ButtonWithoutDefaultsWithoutBaseProps =
        | BatoProps<typeof buttonWithoutBaseWithoutDefaultsString>
        | BatoProps<
          typeof buttonWithoutBaseWithoutDefaultsWithClassNameString
        >
        | BatoProps<typeof buttonWithoutBaseWithoutDefaultsArray>
        | BatoProps<
          typeof buttonWithoutBaseWithoutDefaultsWithClassNameArray
        >;

      // describe.each<[ ButtonWithoutDefaultsWithoutBaseProps, string ]>( [
      //   [
      //     // @ts-expect-error must be a type error
      //     undefined,
      //     "",
      //   ],
      //   [ {}, "" ],
      //   [
      //     {
      //       aCheekyInvalidProp: "lol",
      //     } as ButtonWithoutDefaultsWithoutBaseProps,
      //     "",
      //   ],
      //   [
      //     { intent: "secondary" },
      //     "button--secondary bg-white text-gray-800 border-gray-400 hover:bg-gray-100",
      //   ],
      //   [ { size: "small" }, "button--small text-sm py-1 px-2" ],
      //   [ { disabled: true }, "button--disabled opacity-050 cursor-not-allowed" ],
      //   [
      //     {
      //       intent: "secondary",
      //       size: "unset",
      //     },
      //     "button--secondary bg-white text-gray-800 border-gray-400 hover:bg-gray-100",
      //   ],
      //   [
      //     { intent: "secondary", size: undefined },
      //     "button--secondary bg-white text-gray-800 border-gray-400 hover:bg-gray-100",
      //   ],
      //   [
      //     { intent: "danger", size: "medium" },
      //     "button--danger bg-red-500 text-white border-transparent hover:bg-red-600 button--medium text-base py-2 px-4",
      //   ],
      //   [
      //     { intent: "warning", size: "large" },
      //     "button--warning bg-yellow-500 border-transparent hover:bg-yellow-600 button--large text-lg py-2.5 px-4",
      //   ],
      //   [
      //     { intent: "warning", size: "large", disabled: true },
      //     "button--warning bg-yellow-500 border-transparent hover:bg-yellow-600 button--disabled opacity-050 cursor-not-allowed button--large text-lg py-2.5 px-4 button--warning-disabled text-black",
      //   ],
      //   [
      //     { intent: "primary", m: 0 },
      //     "button--primary bg-blue-500 text-white border-transparent hover:bg-blue-600 m-0",
      //   ],
      //   [
      //     { intent: "primary", m: 1 },
      //     "button--primary bg-blue-500 text-white border-transparent hover:bg-blue-600 m-1",
      //   ],
      //   // !@TODO Add type "extractor" including class prop
      //   [
      //     {
      //       intent: "primary",
      //       m: 1,
      //       class: "adhoc-class",
      //     } as ButtonWithoutDefaultsWithoutBaseProps,
      //     "button--primary bg-blue-500 text-white border-transparent hover:bg-blue-600 m-1 adhoc-class",
      //   ],
      //   [
      //     {
      //       intent: "primary",
      //       m: 1,
      //       className: "adhoc-classname",
      //     } as ButtonWithoutDefaultsWithoutBaseProps,
      //     "button--primary bg-blue-500 text-white border-transparent hover:bg-blue-600 m-1 adhoc-classname",
      //   ],
      // ] )( "button(%o)", ( options, expected ) => {
      //   test(`returns ${expected}`, () => {
      //     expect( buttonWithoutBaseWithoutDefaultsString( options ) ).toBe(
      //       expected,
      //     );
      //     expect( buttonWithoutBaseWithoutDefaultsWithClassNameString( options ) )
      //       .toBe( expected );
      //     expect( buttonWithoutBaseWithoutDefaultsArray( options ) ).toBe( expected );
      //     expect( buttonWithoutBaseWithoutDefaultsWithClassNameArray( options ) )
      //       .toBe( expected );
      //   });
      // } );
    });

    describe("with defaults", () => {
      const buttonWithoutBaseWithDefaultsString = bato( {
        base: "button font-semibold border rounded",
        variants: {
          intent: {
            primary: "button--primary bg-blue-500 text-white border-transparent hover:bg-blue-600",
            secondary: "button--secondary bg-white text-gray-800 border-gray-400 hover:bg-gray-100",
            warning: "button--warning bg-yellow-500 border-transparent hover:bg-yellow-600",
            danger: [ "button--danger", [ 1 && "bg-red-500", {
              baz: false,
              bat: null,
            }, [ "text-white", [ "border-transparent" ] ] ], "hover:bg-red-600" ],
          },
          disabled: {
            true: "button--disabled opacity-050 cursor-not-allowed",
            false: "button--enabled cursor-pointer",
          },
          size: {
            small: "button--small text-sm py-1 px-2",
            medium: "button--medium text-base py-2 px-4",
            large: "button--large text-lg py-2.5 px-4",
          },
          m: {
            0: "m-0",
            1: "m-1",
          },
        },
        compoundVariants: [
          {
            intent: "primary",
            size: "medium",
            class: "button--primary-medium uppercase",
          },
          {
            intent: "warning",
            disabled: false,
            class: "button--warning-enabled text-gray-800",
          },
          {
            intent: "warning",
            disabled: true,
            class: [ "button--warning-disabled", [ 1 && "text-black", {
              baz: false,
              bat: null,
            } ] ],
          },
          {
            intent: [ "warning", "danger" ],
            class: "button--warning-danger !border-red-500",
          },
          {
            intent: [ "warning", "danger" ],
            size: "medium",
            class: "button--warning-danger-medium",
          },
        ],
        defaultVariants: {
          m: 0,
          disabled: false,
          intent: "primary",
          size: "medium",
        },
      } );
      const buttonWithoutBaseWithDefaultsWithClassNameString = bato( {
        base: "button font-semibold border rounded",
        variants: {
          intent: {
            primary: "button--primary bg-blue-500 text-white border-transparent hover:bg-blue-600",
            secondary: "button--secondary bg-white text-gray-800 border-gray-400 hover:bg-gray-100",
            warning: "button--warning bg-yellow-500 border-transparent hover:bg-yellow-600",
            danger: [ "button--danger", [ 1 && "bg-red-500", {
              baz: false,
              bat: null,
            }, [ "text-white", [ "border-transparent" ] ] ], "hover:bg-red-600" ],
          },
          disabled: {
            true: "button--disabled opacity-050 cursor-not-allowed",
            false: "button--enabled cursor-pointer",
          },
          size: {
            small: "button--small text-sm py-1 px-2",
            medium: "button--medium text-base py-2 px-4",
            large: "button--large text-lg py-2.5 px-4",
          },
          m: {
            0: "m-0",
            1: "m-1",
          },
        },
        compoundVariants: [
          {
            intent: "primary",
            size: "medium",
            className: "button--primary-medium uppercase",
          },
          {
            intent: "warning",
            disabled: false,
            className: "button--warning-enabled text-gray-800",
          },
          {
            intent: "warning",
            disabled: true,
            className: [ "button--warning-disabled", [ 1 && "text-black", {
              baz: false,
              bat: null,
            } ] ],
          },
          {
            intent: [ "warning", "danger" ],
            className: "button--warning-danger !border-red-500",
          },
          {
            intent: [ "warning", "danger" ],
            size: "medium",
            className: "button--warning-danger-medium",
          },
        ],
        defaultVariants: {
          m: 0,
          disabled: false,
          intent: "primary",
          size: "medium",
        },
      } );
      const buttonWithoutBaseWithDefaultsArray = bato( {
        base: [ "button", "font-semibold", "border", "rounded" ],
        variants: {
          intent: {
            primary: [
              "button--primary",
              "bg-blue-500",
              "text-white",
              "border-transparent",
              "hover:bg-blue-600",
            ],
            secondary: [
              "button--secondary",
              "bg-white",
              "text-gray-800",
              "border-gray-400",
              "hover:bg-gray-100",
            ],
            warning: [
              "button--warning",
              "bg-yellow-500",
              "border-transparent",
              "hover:bg-yellow-600",
            ],
            danger: [ "button--danger", [ 1 && "bg-red-500", {
              baz: false,
              bat: null,
            }, [ "text-white", [ "border-transparent" ] ] ], "hover:bg-red-600" ],
          },
          disabled: {
            true: [ "button--disabled", "opacity-050", "cursor-not-allowed" ],
            false: [ "button--enabled", "cursor-pointer" ],
          },
          size: {
            small: [ "button--small", "text-sm", "py-1", "px-2" ],
            medium: [ "button--medium", "text-base", "py-2", "px-4" ],
            large: [ "button--large", "text-lg", "py-2.5", "px-4" ],
          },
          m: {
            0: "m-0",
            1: "m-1",
          },
        },
        compoundVariants: [
          {
            intent: "primary",
            size: "medium",
            class: [ "button--primary-medium", "uppercase" ],
          },
          {
            intent: "warning",
            disabled: false,
            class: [ "button--warning-enabled", "text-gray-800" ],
          },
          {
            intent: "warning",
            disabled: true,
            class: [ "button--warning-disabled", [ 1 && "text-black", {
              baz: false,
              bat: null,
            } ] ],
          },
          {
            intent: [ "warning", "danger" ],
            class: [ "button--warning-danger", "!border-red-500" ],
          },
          {
            intent: [ "warning", "danger" ],
            size: "medium",
            class: [ "button--warning-danger-medium" ],
          },
        ],
        defaultVariants: {
          m: 0,
          disabled: false,
          intent: "primary",
          size: "medium",
        },
      } );
      const buttonWithoutBaseWithDefaultsWithClassNameArray = bato( {
        base: [ "button", "font-semibold", "border", "rounded" ],
        variants: {
          intent: {
            primary: [
              "button--primary",
              "bg-blue-500",
              "text-white",
              "border-transparent",
              "hover:bg-blue-600",
            ],
            secondary: [
              "button--secondary",
              "bg-white",
              "text-gray-800",
              "border-gray-400",
              "hover:bg-gray-100",
            ],
            warning: [
              "button--warning",
              "bg-yellow-500",
              "border-transparent",
              "hover:bg-yellow-600",
            ],
            danger: [ "button--danger", [ 1 && "bg-red-500", {
              baz: false,
              bat: null,
            }, [ "text-white", [ "border-transparent" ] ] ], "hover:bg-red-600" ],
          },
          disabled: {
            true: [ "button--disabled", "opacity-050", "cursor-not-allowed" ],
            false: [ "button--enabled", "cursor-pointer" ],
          },
          size: {
            small: [ "button--small", "text-sm", "py-1", "px-2" ],
            medium: [ "button--medium", "text-base", "py-2", "px-4" ],
            large: [ "button--large", "text-lg", "py-2.5", "px-4" ],
          },
          m: {
            0: "m-0",
            1: "m-1",
          },
        },
        compoundVariants: [
          {
            intent: "primary",
            size: "medium",
            className: [ "button--primary-medium", "uppercase" ],
          },
          {
            intent: "warning",
            disabled: false,
            className: [ "button--warning-enabled", "text-gray-800" ],
          },
          {
            intent: "warning",
            disabled: true,
            className: [ "button--warning-disabled", [ 1 && "text-black", {
              baz: false,
              bat: null,
            } ] ],
          },
          {
            intent: [ "warning", "danger" ],
            className: "button--warning-danger !border-red-500",
          },
          {
            intent: [ "warning", "danger" ],
            size: "medium",
            className: "button--warning-danger-medium",
          },
        ],
        defaultVariants: {
          m: 0,
          disabled: false,
          intent: "primary",
          size: "medium",
        },
      } );

      type ButtonWithoutBaseWithDefaultsProps =
        | BatoProps<typeof buttonWithoutBaseWithDefaultsString>
        | BatoProps<typeof buttonWithoutBaseWithDefaultsWithClassNameString>
        | BatoProps<typeof buttonWithoutBaseWithDefaultsArray>
        | BatoProps<typeof buttonWithoutBaseWithDefaultsWithClassNameArray>;

      // describe.each<[ ButtonWithoutBaseWithDefaultsProps, string ]>( [
      //   [
      //     // @ts-expect-error must be a type error
      //     undefined,
      //     "button font-semibold border rounded button--primary bg-blue-500 text-white border-transparent hover:bg-blue-600 button--enabled cursor-pointer button--medium text-base py-2 px-4 m-0 button--primary-medium uppercase",
      //   ],
      //   [
      //     {},
      //     "button font-semibold border rounded button--primary bg-blue-500 text-white border-transparent hover:bg-blue-600 button--enabled cursor-pointer button--medium text-base py-2 px-4 m-0 button--primary-medium uppercase",
      //   ],
      //   [
      //     {
      //       aCheekyInvalidProp: "lol",
      //     } as ButtonWithoutBaseWithDefaultsProps,
      //     "button font-semibold border rounded button--primary bg-blue-500 text-white border-transparent hover:bg-blue-600 button--enabled cursor-pointer button--medium text-base py-2 px-4 m-0 button--primary-medium uppercase",
      //   ],
      //   [
      //     { intent: "secondary" },
      //     "button font-semibold border rounded button--secondary bg-white text-gray-800 border-gray-400 hover:bg-gray-100 button--enabled cursor-pointer button--medium text-base py-2 px-4 m-0",
      //   ],

      //   [
      //     { size: "small" },
      //     "button font-semibold border rounded button--primary bg-blue-500 text-white border-transparent hover:bg-blue-600 button--enabled cursor-pointer button--small text-sm py-1 px-2 m-0",
      //   ],
      //   [
      //     { disabled: true },
      //     "button font-semibold border rounded button--primary bg-blue-500 text-white border-transparent hover:bg-blue-600 button--disabled opacity-050 cursor-not-allowed button--medium text-base py-2 px-4 m-0 button--primary-medium uppercase",
      //   ],
      //   [
      //     {
      //       intent: "secondary",
      //       size: "unset",
      //     },
      //     "button font-semibold border rounded button--secondary bg-white text-gray-800 border-gray-400 hover:bg-gray-100 button--enabled cursor-pointer m-0",
      //   ],
      //   [
      //     { intent: "secondary", size: undefined },
      //     "button font-semibold border rounded button--secondary bg-white text-gray-800 border-gray-400 hover:bg-gray-100 button--enabled cursor-pointer button--medium text-base py-2 px-4 m-0",
      //   ],
      //   [
      //     { intent: "danger", size: "medium" },
      //     "button font-semibold border rounded button--danger bg-red-500 text-white border-transparent hover:bg-red-600 button--enabled cursor-pointer button--medium text-base py-2 px-4 m-0 button--warning-danger !border-red-500 button--warning-danger-medium",
      //   ],
      //   [
      //     { intent: "warning", size: "large" },
      //     "button font-semibold border rounded button--warning bg-yellow-500 border-transparent hover:bg-yellow-600 button--enabled cursor-pointer button--large text-lg py-2.5 px-4 m-0 button--warning-enabled text-gray-800 button--warning-danger !border-red-500",
      //   ],
      //   [
      //     { intent: "warning", size: "large", disabled: true },
      //     "button font-semibold border rounded button--warning bg-yellow-500 border-transparent hover:bg-yellow-600 button--disabled opacity-050 cursor-not-allowed button--large text-lg py-2.5 px-4 m-0 button--warning-disabled text-black button--warning-danger !border-red-500",
      //   ],
      //   [
      //     { intent: "primary", m: 0 },
      //     "button font-semibold border rounded button--primary bg-blue-500 text-white border-transparent hover:bg-blue-600 button--enabled cursor-pointer button--medium text-base py-2 px-4 m-0 button--primary-medium uppercase",
      //   ],
      //   [
      //     { intent: "primary", m: 1 },
      //     "button font-semibold border rounded button--primary bg-blue-500 text-white border-transparent hover:bg-blue-600 button--enabled cursor-pointer button--medium text-base py-2 px-4 m-1 button--primary-medium uppercase",
      //   ],
      //   // !@TODO Add type "extractor" including class prop
      //   [
      //     {
      //       intent: "primary",
      //       m: 0,
      //       class: "adhoc-class",
      //     } as ButtonWithoutBaseWithDefaultsProps,
      //     "button font-semibold border rounded button--primary bg-blue-500 text-white border-transparent hover:bg-blue-600 button--enabled cursor-pointer button--medium text-base py-2 px-4 m-0 button--primary-medium uppercase adhoc-class",
      //   ],
      //   [
      //     {
      //       intent: "primary",
      //       m: 1,
      //       className: "adhoc-classname",
      //     } as ButtonWithoutBaseWithDefaultsProps,
      //     "button font-semibold border rounded button--primary bg-blue-500 text-white border-transparent hover:bg-blue-600 button--enabled cursor-pointer button--medium text-base py-2 px-4 m-1 button--primary-medium uppercase adhoc-classname",
      //   ],
      // ] )( "button(%o)", ( options, expected ) => {
      //   test(`returns ${expected}`, () => {
      //     expect( buttonWithoutBaseWithDefaultsString( options ) ).toBe( expected );
      //     expect( buttonWithoutBaseWithDefaultsWithClassNameString( options ) )
      //       .toBe( expected );
      //     expect( buttonWithoutBaseWithDefaultsArray( options ) ).toBe( expected );
      //     expect( buttonWithoutBaseWithDefaultsWithClassNameArray( options ) ).toBe(
      //       expected,
      //     );
      //   });
      // } );
    });
  });

  describe("with base", () => {
    describe("without defaults", () => {
      const buttonWithBaseWithoutDefaultsString = bato( {
        base: "button font-semibold border rounded",
        variants: {
          intent: {
            primary: "button--primary bg-blue-500 text-white border-transparent hover:bg-blue-600",
            secondary: "button--secondary bg-white text-gray-800 border-gray-400 hover:bg-gray-100",
            warning: "button--warning bg-yellow-500 border-transparent hover:bg-yellow-600",
            danger: [ "button--danger", [ 1 && "bg-red-500", {
              baz: false,
              bat: null,
            }, [ "text-white", [ "border-transparent" ] ] ], "hover:bg-red-600" ],
          },
          disabled: {
            true: "button--disabled opacity-050 cursor-not-allowed",
            false: "button--enabled cursor-pointer",
          },
          size: {
            small: "button--small text-sm py-1 px-2",
            medium: "button--medium text-base py-2 px-4",
            large: "button--large text-lg py-2.5 px-4",
          },
        },
        compoundVariants: [
          {
            intent: "primary",
            size: "medium",
            class: "button--primary-medium uppercase",
          },
          {
            intent: "warning",
            disabled: false,
            class: "button--warning-enabled text-gray-800",
          },
          {
            intent: "warning",
            disabled: true,
            class: [ "button--warning-disabled", [ 1 && "text-black", {
              baz: false,
              bat: null,
            } ] ],
          },
          {
            intent: [ "warning", "danger" ],
            class: "button--warning-danger !border-red-500",
          },
          {
            intent: [ "warning", "danger" ],
            size: "medium",
            class: "button--warning-danger-medium",
          },
        ],
      } );
      const buttonWithBaseWithoutDefaultsWithClassNameString = bato( {
        base: "button font-semibold border rounded",
        variants: {
          intent: {
            primary: "button--primary bg-blue-500 text-white border-transparent hover:bg-blue-600",
            secondary: "button--secondary bg-white text-gray-800 border-gray-400 hover:bg-gray-100",
            warning: "button--warning bg-yellow-500 border-transparent hover:bg-yellow-600",
            danger: [ "button--danger", [ 1 && "bg-red-500", {
              baz: false,
              bat: null,
            }, [ "text-white", [ "border-transparent" ] ] ], "hover:bg-red-600" ],
          },
          disabled: {
            true: "button--disabled opacity-050 cursor-not-allowed",
            false: "button--enabled cursor-pointer",
          },
          size: {
            small: "button--small text-sm py-1 px-2",
            medium: "button--medium text-base py-2 px-4",
            large: "button--large text-lg py-2.5 px-4",
          },
        },
        compoundVariants: [
          {
            intent: "primary",
            size: "medium",
            className: "button--primary-medium uppercase",
          },
          {
            intent: "warning",
            disabled: false,
            className: "button--warning-enabled text-gray-800",
          },
          {
            intent: "warning",
            disabled: true,
            className: [ "button--warning-disabled", [ 1 && "text-black", {
              baz: false,
              bat: null,
            } ] ],
          },
          {
            intent: [ "warning", "danger" ],
            className: "button--warning-danger !border-red-500",
          },
          {
            intent: [ "warning", "danger" ],
            size: "medium",
            className: "button--warning-danger-medium",
          },
        ],
      } );
      const buttonWithBaseWithoutDefaultsArray = bato( {
        base: [ "button", "font-semibold", "border", "rounded" ],
        variants: {
          intent: {
            primary: [
              "button--primary",
              "bg-blue-500",
              "text-white",
              "border-transparent",
              "hover:bg-blue-600",
            ],
            secondary: [
              "button--secondary",
              "bg-white",
              "text-gray-800",
              "border-gray-400",
              "hover:bg-gray-100",
            ],
            warning: [
              "button--warning",
              "bg-yellow-500",
              "border-transparent",
              "hover:bg-yellow-600",
            ],
            danger: [ "button--danger", [ 1 && "bg-red-500", {
              baz: false,
              bat: null,
            }, [ "text-white", [ "border-transparent" ] ] ], "hover:bg-red-600" ],
          },
          disabled: {
            true: [ "button--disabled", "opacity-050", "cursor-not-allowed" ],
            false: [ "button--enabled", "cursor-pointer" ],
          },
          size: {
            small: [ "button--small", "text-sm", "py-1", "px-2" ],
            medium: [ "button--medium", "text-base", "py-2", "px-4" ],
            large: [ "button--large", "text-lg", "py-2.5", "px-4" ],
          },
        },
        compoundVariants: [
          {
            intent: "primary",
            size: "medium",
            class: [ "button--primary-medium", "uppercase" ],
          },
          {
            intent: "warning",
            disabled: false,
            class: [ "button--warning-enabled", "text-gray-800" ],
          },
          {
            intent: "warning",
            disabled: true,
            class: [ "button--warning-disabled", [ 1 && "text-black", {
              baz: false,
              bat: null,
            } ] ],
          },
          {
            intent: [ "warning", "danger" ],
            class: [ "button--warning-danger", "!border-red-500" ],
          },
          {
            intent: [ "warning", "danger" ],
            size: "medium",
            class: [ "button--warning-danger-medium" ],
          },
        ],
      } );
      const buttonWithBaseWithoutDefaultsWithClassNameArray = bato( {
        base: [ "button", "font-semibold", "border", "rounded" ],
        variants: {
          intent: {
            primary: [
              "button--primary",
              "bg-blue-500",
              "text-white",
              "border-transparent",
              "hover:bg-blue-600",
            ],
            secondary: [
              "button--secondary",
              "bg-white",
              "text-gray-800",
              "border-gray-400",
              "hover:bg-gray-100",
            ],
            warning: [
              "button--warning",
              "bg-yellow-500",
              "border-transparent",
              "hover:bg-yellow-600",
            ],
            danger: [ "button--danger", [ 1 && "bg-red-500", {
              baz: false,
              bat: null,
            }, [ "text-white", [ "border-transparent" ] ] ], "hover:bg-red-600" ],
          },
          disabled: {
            true: [ "button--disabled", "opacity-050", "cursor-not-allowed" ],
            false: [ "button--enabled", "cursor-pointer" ],
          },
          size: {
            small: [ "button--small", "text-sm", "py-1", "px-2" ],
            medium: [ "button--medium", "text-base", "py-2", "px-4" ],
            large: [ "button--large", "text-lg", "py-2.5", "px-4" ],
          },
        },
        compoundVariants: [
          {
            intent: "primary",
            size: "medium",
            className: [ "button--primary-medium", "uppercase" ],
          },
          {
            intent: "warning",
            disabled: false,
            className: [ "button--warning-enabled", "text-gray-800" ],
          },
          {
            intent: "warning",
            disabled: true,
            className: [ "button--warning-disabled", [ 1 && "text-black", {
              baz: false,
              bat: null,
            } ] ],
          },
          {
            intent: [ "warning", "danger" ],
            className: [ "button--warning-danger", "!border-red-500" ],
          },
          {
            intent: [ "warning", "danger" ],
            size: "medium",
            className: [ "button--warning-danger-medium" ],
          },
        ],
      } );

      type ButtonWithBaseWithoutDefaultsProps =
        | BatoProps<typeof buttonWithBaseWithoutDefaultsString>
        | BatoProps<typeof buttonWithBaseWithoutDefaultsWithClassNameString>
        | BatoProps<typeof buttonWithBaseWithoutDefaultsArray>
        | BatoProps<typeof buttonWithBaseWithoutDefaultsWithClassNameArray>;

      // describe.each<[ ButtonWithBaseWithoutDefaultsProps, string ]>( [
      //   [
      //     undefined as unknown as ButtonWithBaseWithoutDefaultsProps,
      //     "button font-semibold border rounded",
      //   ],
      //   [ {}, "button font-semibold border rounded" ],
      //   [
      //     {
      //       // @ts-expect-error must be a type error
      //       aCheekyInvalidProp: "lol",
      //     },
      //     "button font-semibold border rounded",
      //   ],
      //   [
      //     { intent: "secondary" },
      //     "button font-semibold border rounded button--secondary bg-white text-gray-800 border-gray-400 hover:bg-gray-100",
      //   ],

      //   [
      //     { size: "small" },
      //     "button font-semibold border rounded button--small text-sm py-1 px-2",
      //   ],
      //   [
      //     { disabled: false },
      //     "button font-semibold border rounded button--enabled cursor-pointer",
      //   ],
      //   [
      //     { disabled: true },
      //     "button font-semibold border rounded button--disabled opacity-050 cursor-not-allowed",
      //   ],
      //   [
      //     { intent: "secondary", size: "unset" },
      //     "button font-semibold border rounded button--secondary bg-white text-gray-800 border-gray-400 hover:bg-gray-100",
      //   ],
      //   [
      //     { intent: "secondary", size: undefined },
      //     "button font-semibold border rounded button--secondary bg-white text-gray-800 border-gray-400 hover:bg-gray-100",
      //   ],
      //   [
      //     { intent: "danger", size: "medium" },
      //     "button font-semibold border rounded button--danger bg-red-500 text-white border-transparent hover:bg-red-600 button--medium text-base py-2 px-4 button--warning-danger !border-red-500 button--warning-danger-medium",
      //   ],
      //   [
      //     { intent: "warning", size: "large" },
      //     "button font-semibold border rounded button--warning bg-yellow-500 border-transparent hover:bg-yellow-600 button--large text-lg py-2.5 px-4 button--warning-danger !border-red-500",
      //   ],
      //   [
      //     { intent: "warning", size: "large", disabled: "unset" },
      //     "button font-semibold border rounded button--warning bg-yellow-500 border-transparent hover:bg-yellow-600 button--large text-lg py-2.5 px-4 button--warning-danger !border-red-500",
      //   ],
      //   [
      //     { intent: "warning", size: "large", disabled: true },
      //     "button font-semibold border rounded button--warning bg-yellow-500 border-transparent hover:bg-yellow-600 button--disabled opacity-050 cursor-not-allowed button--large text-lg py-2.5 px-4 button--warning-disabled text-black button--warning-danger !border-red-500",
      //   ],
      //   [
      //     { intent: "warning", size: "large", disabled: false },
      //     "button font-semibold border rounded button--warning bg-yellow-500 border-transparent hover:bg-yellow-600 button--enabled cursor-pointer button--large text-lg py-2.5 px-4 button--warning-enabled text-gray-800 button--warning-danger !border-red-500",
      //   ],
      //   // !@TODO Add type "extractor" including class prop
      //   [
      //     {
      //       intent: "primary",
      //       class: "adhoc-class",
      //     } as ButtonWithBaseWithoutDefaultsProps,
      //     "button font-semibold border rounded button--primary bg-blue-500 text-white border-transparent hover:bg-blue-600 adhoc-class",
      //   ],
      //   [
      //     {
      //       intent: "primary",
      //       className: "adhoc-className",
      //     } as ButtonWithBaseWithoutDefaultsProps,
      //     "button font-semibold border rounded button--primary bg-blue-500 text-white border-transparent hover:bg-blue-600 adhoc-className",
      //   ],
      // ] )( "button(%o)", ( options, expected ) => {
      //   test(`returns ${expected}`, () => {
      //     expect( buttonWithBaseWithoutDefaultsString( options ) ).toBe( expected );
      //     expect( buttonWithBaseWithoutDefaultsWithClassNameString( options ) )
      //       .toBe( expected );
      //     expect( buttonWithBaseWithoutDefaultsArray( options ) ).toBe( expected );
      //     expect( buttonWithBaseWithoutDefaultsWithClassNameArray( options ) ).toBe(
      //       expected,
      //     );
      //   });
      // } );
    });

    describe("with defaults", () => {
      const buttonWithBaseWithDefaultsString = bato( {
        base: "button font-semibold border rounded",
        variants: {
          intent: {
            primary: "button--primary bg-blue-500 text-white border-transparent hover:bg-blue-600",
            secondary: "button--secondary bg-white text-gray-800 border-gray-400 hover:bg-gray-100",
            warning: "button--warning bg-yellow-500 border-transparent hover:bg-yellow-600",
            danger: [ "button--danger", [ 1 && "bg-red-500", {
              baz: false,
              bat: null,
            }, [ "text-white", [ "border-transparent" ] ] ], "hover:bg-red-600" ],
          },
          disabled: {
            true: "button--disabled opacity-050 cursor-not-allowed",
            false: "button--enabled cursor-pointer",
          },
          size: {
            small: "button--small text-sm py-1 px-2",
            medium: "button--medium text-base py-2 px-4",
            large: "button--large text-lg py-2.5 px-4",
          },
        },
        compoundVariants: [
          {
            intent: "primary",
            size: "medium",
            class: "button--primary-medium uppercase",
          },
          {
            intent: "warning",
            disabled: false,
            class: "button--warning-enabled text-gray-800",
          },
          {
            intent: "warning",
            disabled: true,
            class: [ "button--warning-disabled", [ 1 && "text-black", {
              baz: false,
              bat: null,
            } ] ],
          },
          {
            intent: [ "warning", "danger" ],
            class: "button--warning-danger !border-red-500",
          },
          {
            intent: [ "warning", "danger" ],
            size: "medium",
            class: "button--warning-danger-medium",
          },
        ],
        defaultVariants: {
          disabled: false,
          intent: "primary",
          size: "medium",
        },
      } );
      const buttonWithBaseWithDefaultsWithClassNameString = bato( {
        base: "button font-semibold border rounded",
        variants: {
          intent: {
            primary: "button--primary bg-blue-500 text-white border-transparent hover:bg-blue-600",
            secondary: "button--secondary bg-white text-gray-800 border-gray-400 hover:bg-gray-100",
            warning: "button--warning bg-yellow-500 border-transparent hover:bg-yellow-600",
            danger: [ "button--danger", [ 1 && "bg-red-500", {
              baz: false,
              bat: null,
            }, [ "text-white", [ "border-transparent" ] ] ], "hover:bg-red-600" ],
          },
          disabled: {
            true: "button--disabled opacity-050 cursor-not-allowed",
            false: "button--enabled cursor-pointer",
          },
          size: {
            small: "button--small text-sm py-1 px-2",
            medium: "button--medium text-base py-2 px-4",
            large: "button--large text-lg py-2.5 px-4",
          },
        },
        compoundVariants: [
          {
            intent: "primary",
            size: "medium",
            className: "button--primary-medium uppercase",
          },
          {
            intent: "warning",
            disabled: false,
            className: "button--warning-enabled text-gray-800",
          },
          {
            intent: "warning",
            disabled: true,
            className: [ "button--warning-disabled", [ 1 && "text-black", {
              baz: false,
              bat: null,
            } ] ],
          },
          {
            intent: [ "warning", "danger" ],
            className: "button--warning-danger !border-red-500",
          },
          {
            intent: [ "warning", "danger" ],
            size: "medium",
            className: "button--warning-danger-medium",
          },
        ],
        defaultVariants: {
          disabled: false,
          intent: "primary",
          size: "medium",
        },
      } );
      const buttonWithBaseWithDefaultsArray = bato( {
        base: [ "button", "font-semibold", "border", "rounded" ],
        variants: {
          intent: {
            primary: [
              "button--primary",
              "bg-blue-500",
              "text-white",
              "border-transparent",
              "hover:bg-blue-600",
            ],
            secondary: [
              "button--secondary",
              "bg-white",
              "text-gray-800",
              "border-gray-400",
              "hover:bg-gray-100",
            ],
            warning: [
              "button--warning",
              "bg-yellow-500",
              "border-transparent",
              "hover:bg-yellow-600",
            ],
            danger: [ "button--danger", [ 1 && "bg-red-500", {
              baz: false,
              bat: null,
            }, [ "text-white", [ "border-transparent" ] ] ], "hover:bg-red-600" ],
          },
          disabled: {
            true: [ "button--disabled", "opacity-050", "cursor-not-allowed" ],
            false: [ "button--enabled", "cursor-pointer" ],
          },
          size: {
            small: [ "button--small", "text-sm", "py-1", "px-2" ],
            medium: [ "button--medium", "text-base", "py-2", "px-4" ],
            large: [ "button--large", "text-lg", "py-2.5", "px-4" ],
          },
        },
        compoundVariants: [
          {
            intent: "primary",
            size: "medium",
            class: [ "button--primary-medium", "uppercase" ],
          },
          {
            intent: "warning",
            disabled: false,
            class: [ "button--warning-enabled", "text-gray-800" ],
          },
          {
            intent: "warning",
            disabled: true,
            class: [ "button--warning-disabled", [ 1 && "text-black", {
              baz: false,
              bat: null,
            } ] ],
          },
          {
            intent: [ "warning", "danger" ],
            class: [ "button--warning-danger", "!border-red-500" ],
          },
          {
            intent: [ "warning", "danger" ],
            size: "medium",
            class: [ "button--warning-danger-medium" ],
          },
        ],
        defaultVariants: {
          disabled: false,
          intent: "primary",
          size: "medium",
        },
      } );
      const buttonWithBaseWithDefaultsWithClassNameArray = bato( {
        base: [ "button", "font-semibold", "border", "rounded" ],
        variants: {
          intent: {
            primary: [
              "button--primary",
              "bg-blue-500",
              "text-white",
              "border-transparent",
              "hover:bg-blue-600",
            ],
            secondary: [
              "button--secondary",
              "bg-white",
              "text-gray-800",
              "border-gray-400",
              "hover:bg-gray-100",
            ],
            warning: [
              "button--warning",
              "bg-yellow-500",
              "border-transparent",
              "hover:bg-yellow-600",
            ],
            danger: [ "button--danger", [ 1 && "bg-red-500", {
              baz: false,
              bat: null,
            }, [ "text-white", [ "border-transparent" ] ] ], "hover:bg-red-600" ],
          },
          disabled: {
            true: [ "button--disabled", "opacity-050", "cursor-not-allowed" ],
            false: [ "button--enabled", "cursor-pointer" ],
          },
          size: {
            small: [ "button--small", "text-sm", "py-1", "px-2" ],
            medium: [ "button--medium", "text-base", "py-2", "px-4" ],
            large: [ "button--large", "text-lg", "py-2.5", "px-4" ],
          },
        },
        compoundVariants: [
          {
            intent: "primary",
            size: "medium",
            className: [ "button--primary-medium", "uppercase" ],
          },
          {
            intent: "warning",
            disabled: false,
            className: [ "button--warning-enabled", "text-gray-800" ],
          },
          {
            intent: "warning",
            disabled: true,
            className: [ "button--warning-disabled", [ 1 && "text-black", {
              baz: false,
              bat: null,
            } ] ],
          },
          {
            intent: [ "warning", "danger" ],
            className: [ "button--warning-danger", "!border-red-500" ],
          },
          {
            intent: [ "warning", "danger" ],
            size: "medium",
            className: [ "button--warning-danger-medium" ],
          },
        ],
        defaultVariants: {
          disabled: false,
          intent: "primary",
          size: "medium",
        },
      } );

      type ButtonWithBaseWithDefaultsProps =
        | BatoProps<typeof buttonWithBaseWithDefaultsString>
        | BatoProps<typeof buttonWithBaseWithDefaultsWithClassNameString>
        | BatoProps<typeof buttonWithBaseWithDefaultsArray>
        | BatoProps<typeof buttonWithBaseWithDefaultsWithClassNameArray>;

      // describe.each<[ ButtonWithBaseWithDefaultsProps, string ]>( [
      //   [
      //     // @ts-expect-error must be a type error
      //     undefined,
      //     "button font-semibold border rounded button--primary bg-blue-500 text-white border-transparent hover:bg-blue-600 button--enabled cursor-pointer button--medium text-base py-2 px-4 button--primary-medium uppercase",
      //   ],
      //   [
      //     {},
      //     "button font-semibold border rounded button--primary bg-blue-500 text-white border-transparent hover:bg-blue-600 button--enabled cursor-pointer button--medium text-base py-2 px-4 button--primary-medium uppercase",
      //   ],
      //   [
      //     {
      //       aCheekyInvalidProp: "lol",
      //     } as ButtonWithBaseWithDefaultsProps,
      //     "button font-semibold border rounded button--primary bg-blue-500 text-white border-transparent hover:bg-blue-600 button--enabled cursor-pointer button--medium text-base py-2 px-4 button--primary-medium uppercase",
      //   ],
      //   [
      //     { intent: "secondary" },
      //     "button font-semibold border rounded button--secondary bg-white text-gray-800 border-gray-400 hover:bg-gray-100 button--enabled cursor-pointer button--medium text-base py-2 px-4",
      //   ],

      //   [
      //     { size: "small" },
      //     "button font-semibold border rounded button--primary bg-blue-500 text-white border-transparent hover:bg-blue-600 button--enabled cursor-pointer button--small text-sm py-1 px-2",
      //   ],
      //   [
      //     { disabled: "unset" },
      //     "button font-semibold border rounded button--primary bg-blue-500 text-white border-transparent hover:bg-blue-600 button--medium text-base py-2 px-4 button--primary-medium uppercase",
      //   ],
      //   [
      //     { disabled: false },
      //     "button font-semibold border rounded button--primary bg-blue-500 text-white border-transparent hover:bg-blue-600 button--enabled cursor-pointer button--medium text-base py-2 px-4 button--primary-medium uppercase",
      //   ],
      //   [
      //     { disabled: true },
      //     "button font-semibold border rounded button--primary bg-blue-500 text-white border-transparent hover:bg-blue-600 button--disabled opacity-050 cursor-not-allowed button--medium text-base py-2 px-4 button--primary-medium uppercase",
      //   ],
      //   [
      //     { intent: "secondary", size: "unset" },
      //     "button font-semibold border rounded button--secondary bg-white text-gray-800 border-gray-400 hover:bg-gray-100 button--enabled cursor-pointer",
      //   ],
      //   [
      //     { intent: "secondary", size: undefined },
      //     "button font-semibold border rounded button--secondary bg-white text-gray-800 border-gray-400 hover:bg-gray-100 button--enabled cursor-pointer button--medium text-base py-2 px-4",
      //   ],
      //   [
      //     { intent: "danger", size: "medium" },
      //     "button font-semibold border rounded button--danger bg-red-500 text-white border-transparent hover:bg-red-600 button--enabled cursor-pointer button--medium text-base py-2 px-4 button--warning-danger !border-red-500 button--warning-danger-medium",
      //   ],
      //   [
      //     { intent: "warning", size: "large" },
      //     "button font-semibold border rounded button--warning bg-yellow-500 border-transparent hover:bg-yellow-600 button--enabled cursor-pointer button--large text-lg py-2.5 px-4 button--warning-enabled text-gray-800 button--warning-danger !border-red-500",
      //   ],
      //   [
      //     {
      //       intent: "warning",
      //       size: "large",
      //       disabled: "unset",
      //     },
      //     "button font-semibold border rounded button--warning bg-yellow-500 border-transparent hover:bg-yellow-600 button--large text-lg py-2.5 px-4 button--warning-danger !border-red-500",
      //   ],
      //   [
      //     { intent: "warning", size: "large", disabled: true },
      //     "button font-semibold border rounded button--warning bg-yellow-500 border-transparent hover:bg-yellow-600 button--disabled opacity-050 cursor-not-allowed button--large text-lg py-2.5 px-4 button--warning-disabled text-black button--warning-danger !border-red-500",
      //   ],
      //   [
      //     { intent: "warning", size: "large", disabled: false },
      //     "button font-semibold border rounded button--warning bg-yellow-500 border-transparent hover:bg-yellow-600 button--enabled cursor-pointer button--large text-lg py-2.5 px-4 button--warning-enabled text-gray-800 button--warning-danger !border-red-500",
      //   ],
      //   // !@TODO Add type "extractor" including class prop
      //   [
      //     {
      //       intent: "primary",
      //       class: "adhoc-class",
      //     } as ButtonWithBaseWithDefaultsProps,
      //     "button font-semibold border rounded button--primary bg-blue-500 text-white border-transparent hover:bg-blue-600 button--enabled cursor-pointer button--medium text-base py-2 px-4 button--primary-medium uppercase adhoc-class",
      //   ],
      //   [
      //     {
      //       intent: "primary",
      //       className: "adhoc-classname",
      //     } as ButtonWithBaseWithDefaultsProps,
      //     "button font-semibold border rounded button--primary bg-blue-500 text-white border-transparent hover:bg-blue-600 button--enabled cursor-pointer button--medium text-base py-2 px-4 button--primary-medium uppercase adhoc-classname",
      //   ],
      // ] )( "button(%o)", ( options, expected ) => {
      //   test(`returns ${expected}`, () => {
      //     expect( buttonWithBaseWithDefaultsString( options ) ).toBe( expected );
      //     expect( buttonWithBaseWithDefaultsWithClassNameString( options ) ).toBe(
      //       expected,
      //     );
      //     expect( buttonWithBaseWithDefaultsArray( options ) ).toBe( expected );
      //     expect( buttonWithBaseWithDefaultsWithClassNameArray( options ) ).toBe(
      //       expected,
      //     );
      //   });
      // } );
    });
  });

  describe("composing classes", () => {
    type BoxProps = BatoProps<typeof box>;
    const box = bato( {
      base: [ "box", "box-border" ],
      variants: {
        margin: { 0: "m-0", 2: "m-2", 4: "m-4", 8: "m-8" },
        padding: { 0: "p-0", 2: "p-2", 4: "p-4", 8: "p-8" },
      },
      defaultVariants: {
        margin: 0,
        padding: 0,
      },
    } );

    type CardBaseProps = BatoProps<typeof cardBase>;
    const cardBase = bato( {
      base: [ "card", "border-solid", "border-slate-300", "rounded" ],
      variants: {
        shadow: {
          md: "drop-shadow-md",
          lg: "drop-shadow-lg",
          xl: "drop-shadow-xl",
        },
      },
    } );

    interface CardProps extends BoxProps, CardBaseProps {}
    const card = ( { margin, padding, shadow }: CardProps = {} ) =>
      classes( box( { margin, padding } ), cardBase( { shadow } ) );

    // describe.each<[ CardProps, string ]>( [
    //   [
    //     // @ts-expect-error must be a type error
    //     undefined,
    //     "box box-border m-0 p-0 card border-solid border-slate-300 rounded",
    //   ],
    //   [ {}, "box box-border m-0 p-0 card border-solid border-slate-300 rounded" ],
    //   [
    //     { margin: 4 },
    //     "box box-border m-4 p-0 card border-solid border-slate-300 rounded",
    //   ],
    //   [
    //     { padding: 4 },
    //     "box box-border m-0 p-4 card border-solid border-slate-300 rounded",
    //   ],
    //   [
    //     { margin: 2, padding: 4 },
    //     "box box-border m-2 p-4 card border-solid border-slate-300 rounded",
    //   ],
    //   [
    //     { shadow: "md" },
    //     "box box-border m-0 p-0 card border-solid border-slate-300 rounded drop-shadow-md",
    //   ],
    // ] )( "card(%o)", ( options, expected ) => {
    //   test(`returns ${expected}`, () => {
    //     expect( card( options ) ).toBe( expected );
    //   });
    // } );
  });
});

describe("compose", () => {
  test("should merge into a single component", () => {
    const box = bato( {
      variants: {
        shadow: {
          sm: "shadow-sm",
          md: "shadow-md",
        },
      },
      defaultVariants: {
        shadow: "sm",
      },
    } );

    const stack = bato( {
      variants: {
        gap: {
          unset: null,
          1: "gap-1",
          2: "gap-2",
          3: "gap-3",
        },
      },
      defaultVariants: {
        gap: "unset",
      },
    } );

    const bg = bato( {
      variants: {
        bg: {
          unset: null,
          red: "bg-red-300 opacity-50 rounded-lg",
          blue: "bg-blue-300 opacity-50 rounded-lg",
          purple: "bg-purple-300 opacity-50 rounded-lg",
        },
      },
      defaultVariants: {
        bg: "unset",
      },
    } );

    const card = compose( box, stack, bg );

    // expectTypeOf( card ).toBeFunction();
    // expectTypeOf( card ).parameter( 0 ).toMatchTypeOf<      | {        shadow?: "sm" | "md" | undefined | "unset";        gap?: "unset" | 1 | 2 | 3 | undefined;        bg?: "unset" | "red" | "blue" | "purple" | undefined;      }      | undefined    >();

    expect( card() ).toBe( "shadow-sm" );
    expect( card( { class: "adhoc-class" } ) ).toBe( "shadow-sm adhoc-class" );
    expect( card( { className: "adhoc-class" } ) ).toBe( "shadow-sm adhoc-class" );
    expect( card( { shadow: "md" } ) ).toBe( "shadow-md" );
    expect( card( { gap: 2 } ) ).toBe( "shadow-sm gap-2" );
    expect( card( { shadow: "md", gap: 3, class: "adhoc-class" } ) ).toBe(
      "shadow-md gap-3 adhoc-class",
    );
    expect( card( { shadow: "md", gap: 3, className: "adhoc-class" } ) ).toBe(
      "shadow-md gap-3 adhoc-class",
    );
    expect( card( { bg: "red", gap: 2 } ) ).toBe(
      "shadow-sm gap-2 bg-red-300 opacity-50 rounded-lg",
    );
  });
});

describe("bato", () => {
  describe("without base", () => {
    describe("without anything", () => {
      test("empty", () => {
        // @ts-expect-error must be a type error
        const example = bato();

        expect( example() ).toBe( "" );
        expect(
          example( {
            // @ts-expect-error must be a type error
            aCheekyInvalidProp: "lol",
          } ),
        ).toBe( "" );
        expect( example( { class: "adhoc-class" } ) ).toBe( "adhoc-class" );
        expect( example( { className: "adhoc-className" } ) ).toBe(
          "adhoc-className",
        );
        expect(
          example( {
            class: "adhoc-class",
            // @ts-expect-error must be a type error
            className: "adhoc-className",
          } ),
        ).toBe( "adhoc-class adhoc-className" );
      });

      test("undefined", () => {
        // @ts-expect-error must be a type error
        const example = bato( undefined );
        expect( example() ).toBe( "" );
        expect(
          example( {
            // @ts-expect-error must be a type error
            aCheekyInvalidProp: "lol",
          } ),
        ).toBe( "" );
        expect( example( { class: "adhoc-class" } ) ).toBe( "adhoc-class" );
        expect( example( { className: "adhoc-className" } ) ).toBe(
          "adhoc-className",
        );
        expect(
          example( {
            class: "adhoc-class",
            // @ts-expect-error must be a type error
            className: "adhoc-className",
          } ),
        ).toBe( "adhoc-class adhoc-className" );
      });

      test("null", () => {
        const example = bato(
          // @ts-expect-error must be a type error
          null,
        );
        expect( example() ).toBe( "" );
        expect(
          example( {
            // @ts-expect-error must be a type error
            aCheekyInvalidProp: "lol",
          } ),
        ).toBe( "" );
        expect( example( { class: "adhoc-class" } ) ).toBe( "adhoc-class" );
        expect( example( { className: "adhoc-className" } ) ).toBe(
          "adhoc-className",
        );
        expect(
          example( {
            class: "adhoc-class",
            // @ts-expect-error must be a type error
            className: "adhoc-className",
          } ),
        ).toBe( "adhoc-class adhoc-className" );
      });
    });

    describe("without defaults", () => {
      const buttonWithoutBaseWithoutDefaultsString = bato( {
        variants: {
          intent: {
            unset: null,
            primary: "button--primary bg-blue-500 text-white border-transparent hover:bg-blue-600",
            secondary: "button--secondary bg-white text-gray-800 border-gray-400 hover:bg-gray-100",
            warning: "button--warning bg-yellow-500 border-transparent hover:bg-yellow-600",
            danger: [ "button--danger", [ 1 && "bg-red-500", {
              baz: false,
              bat: null,
            }, [ "text-white", [ "border-transparent" ] ] ], "hover:bg-red-600" ],
          },
          disabled: {
            unset: null,
            true: "button--disabled opacity-050 cursor-not-allowed",
            false: "button--enabled cursor-pointer",
          },
          size: {
            unset: null,
            small: "button--small text-sm py-1 px-2",
            medium: "button--medium text-base py-2 px-4",
            large: "button--large text-lg py-2.5 px-4",
          },
          m: {
            unset: null,
            0: "m-0",
            1: "m-1",
          },
        },
        compoundVariants: [
          {
            intent: "primary",
            size: "medium",
            class: "button--primary-medium uppercase",
          },
          {
            intent: "warning",
            disabled: false,
            class: "button--warning-enabled text-gray-800",
          },
          {
            intent: "warning",
            disabled: true,
            class: [ "button--warning-disabled", [ 1 && "text-black", {
              baz: false,
              bat: null,
            } ] ],
          },
        ],
      } );
      const buttonWithoutBaseWithoutDefaultsWithClassNameString = bato( {
        variants: {
          intent: {
            unset: null,
            primary: "button--primary bg-blue-500 text-white border-transparent hover:bg-blue-600",
            secondary: "button--secondary bg-white text-gray-800 border-gray-400 hover:bg-gray-100",
            warning: "button--warning bg-yellow-500 border-transparent hover:bg-yellow-600",
            danger: [ "button--danger", [ 1 && "bg-red-500", {
              baz: false,
              bat: null,
            }, [ "text-white", [ "border-transparent" ] ] ], "hover:bg-red-600" ],
          },
          disabled: {
            unset: null,
            true: "button--disabled opacity-050 cursor-not-allowed",
            false: "button--enabled cursor-pointer",
          },
          size: {
            unset: null,
            small: "button--small text-sm py-1 px-2",
            medium: "button--medium text-base py-2 px-4",
            large: "button--large text-lg py-2.5 px-4",
          },
          m: {
            unset: null,
            0: "m-0",
            1: "m-1",
          },
        },
        compoundVariants: [
          {
            intent: "primary",
            size: "medium",
            className: "button--primary-medium uppercase",
          },
          {
            intent: "warning",
            disabled: false,
            className: "button--warning-enabled text-gray-800",
          },
          {
            intent: "warning",
            disabled: true,
            className: [ "button--warning-disabled", [ 1 && "text-black", {
              baz: false,
              bat: null,
            } ] ],
          },
        ],
      } );

      const buttonWithoutBaseWithoutDefaultsArray = bato( {
        variants: {
          intent: {
            unset: null,
            primary: [
              "button--primary",
              "bg-blue-500",
              "text-white",
              "border-transparent",
              "hover:bg-blue-600",
            ],
            secondary: [
              "button--secondary",
              "bg-white",
              "text-gray-800",
              "border-gray-400",
              "hover:bg-gray-100",
            ],
            warning: [
              "button--warning",
              "bg-yellow-500",
              "border-transparent",
              "hover:bg-yellow-600",
            ],
            danger: [ "button--danger", [ 1 && "bg-red-500", {
              baz: false,
              bat: null,
            }, [ "text-white", [ "border-transparent" ] ] ], "hover:bg-red-600" ],
          },
          disabled: {
            unset: null,
            true: [ "button--disabled", "opacity-050", "cursor-not-allowed" ],
            false: [ "button--enabled", "cursor-pointer" ],
          },
          size: {
            unset: null,
            small: [ "button--small", "text-sm", "py-1", "px-2" ],
            medium: [ "button--medium", "text-base", "py-2", "px-4" ],
            large: [ "button--large", "text-lg", "py-2.5", "px-4" ],
          },
          m: {
            unset: null,
            0: "m-0",
            1: "m-1",
          },
        },
        compoundVariants: [
          {
            intent: "primary",
            size: "medium",
            class: [ "button--primary-medium", "uppercase" ],
          },
          {
            intent: "warning",
            disabled: false,
            class: [ "button--warning-enabled", "text-gray-800" ],
          },
          {
            intent: "warning",
            disabled: true,
            class: [ "button--warning-disabled", [ 1 && "text-black", {
              baz: false,
              bat: null,
            } ] ],
          },
        ],
      } );
      const buttonWithoutBaseWithoutDefaultsWithClassNameArray = bato( {
        variants: {
          intent: {
            unset: null,
            primary: [
              "button--primary",
              "bg-blue-500",
              "text-white",
              "border-transparent",
              "hover:bg-blue-600",
            ],
            secondary: [
              "button--secondary",
              "bg-white",
              "text-gray-800",
              "border-gray-400",
              "hover:bg-gray-100",
            ],
            warning: [
              "button--warning",
              "bg-yellow-500",
              "border-transparent",
              "hover:bg-yellow-600",
            ],
            danger: [ "button--danger", [ 1 && "bg-red-500", {
              baz: false,
              bat: null,
            }, [ "text-white", [ "border-transparent" ] ] ], "hover:bg-red-600" ],
          },
          disabled: {
            unset: null,
            true: [ "button--disabled", "opacity-050", "cursor-not-allowed" ],
            false: [ "button--enabled", "cursor-pointer" ],
          },
          size: {
            unset: null,
            small: [ "button--small", "text-sm", "py-1", "px-2" ],
            medium: [ "button--medium", "text-base", "py-2", "px-4" ],
            large: [ "button--large", "text-lg", "py-2.5", "px-4" ],
          },
          m: {
            unset: null,
            0: "m-0",
            1: "m-1",
          },
        },
        compoundVariants: [
          {
            intent: "primary",
            size: "medium",
            className: [ "button--primary-medium", "uppercase" ],
          },
          {
            intent: "warning",
            disabled: false,
            className: [ "button--warning-enabled", "text-gray-800" ],
          },
          {
            intent: "warning",
            disabled: true,
            className: [ "button--warning-disabled", [ 1 && "text-black", {
              baz: false,
              bat: null,
            } ] ],
          },
        ],
      } );

      type ButtonWithoutDefaultsWithoutBaseProps =
        | BatoProps<typeof buttonWithoutBaseWithoutDefaultsString>
        | BatoProps<
          typeof buttonWithoutBaseWithoutDefaultsWithClassNameString
        >
        | BatoProps<typeof buttonWithoutBaseWithoutDefaultsArray>
        | BatoProps<
          typeof buttonWithoutBaseWithoutDefaultsWithClassNameArray
        >;

      // describe.each<[ ButtonWithoutDefaultsWithoutBaseProps, string ]>( [
      //   [
      //     // @ts-expect-error must be a type error
      //     undefined,
      //     "",
      //   ],
      //   [ {}, "" ],
      //   [
      //     {
      //       aCheekyInvalidProp: "lol",
      //     } as ButtonWithoutDefaultsWithoutBaseProps,
      //     "",
      //   ],
      //   [
      //     { intent: "secondary" },
      //     "button--secondary bg-white text-gray-800 border-gray-400 hover:bg-gray-100",
      //   ],
      //   [ { size: "small" }, "button--small text-sm py-1 px-2" ],
      //   [ { disabled: true }, "button--disabled opacity-050 cursor-not-allowed" ],
      //   [
      //     {
      //       intent: "secondary",
      //       size: "unset",
      //     },
      //     "button--secondary bg-white text-gray-800 border-gray-400 hover:bg-gray-100",
      //   ],
      //   [
      //     { intent: "secondary", size: undefined },
      //     "button--secondary bg-white text-gray-800 border-gray-400 hover:bg-gray-100",
      //   ],
      //   [
      //     { intent: "danger", size: "medium" },
      //     "button--danger bg-red-500 text-white border-transparent hover:bg-red-600 button--medium text-base py-2 px-4",
      //   ],
      //   [
      //     { intent: "warning", size: "large" },
      //     "button--warning bg-yellow-500 border-transparent hover:bg-yellow-600 button--large text-lg py-2.5 px-4",
      //   ],
      //   [
      //     { intent: "warning", size: "large", disabled: true },
      //     "button--warning bg-yellow-500 border-transparent hover:bg-yellow-600 button--disabled opacity-050 cursor-not-allowed button--large text-lg py-2.5 px-4 button--warning-disabled text-black",
      //   ],
      //   [
      //     { intent: "primary", m: 0 },
      //     "button--primary bg-blue-500 text-white border-transparent hover:bg-blue-600 m-0",
      //   ],
      //   [
      //     { intent: "primary", m: 1 },
      //     "button--primary bg-blue-500 text-white border-transparent hover:bg-blue-600 m-1",
      //   ],
      //   // !@TODO Add type "extractor" including class prop
      //   [
      //     {
      //       intent: "primary",
      //       m: 1,
      //       class: "adhoc-class",
      //     } as ButtonWithoutDefaultsWithoutBaseProps,
      //     "button--primary bg-blue-500 text-white border-transparent hover:bg-blue-600 m-1 adhoc-class",
      //   ],
      //   [
      //     {
      //       intent: "primary",
      //       m: 1,
      //       className: "adhoc-classname",
      //     } as ButtonWithoutDefaultsWithoutBaseProps,
      //     "button--primary bg-blue-500 text-white border-transparent hover:bg-blue-600 m-1 adhoc-classname",
      //   ],
      // ] )( "button(%o)", ( options, expected ) => {
      //   test(`returns ${expected}`, () => {
      //     expect( buttonWithoutBaseWithoutDefaultsString( options ) ).toBe(
      //       expected,
      //     );
      //     expect( buttonWithoutBaseWithoutDefaultsWithClassNameString( options ) )
      //       .toBe( expected );
      //     expect( buttonWithoutBaseWithoutDefaultsArray( options ) ).toBe( expected );
      //     expect( buttonWithoutBaseWithoutDefaultsWithClassNameArray( options ) )
      //       .toBe( expected );
      //   });
      // } );
    });

    describe("with defaults", () => {
      const buttonWithoutBaseWithDefaultsString = bato( {
        base: "button font-semibold border rounded",
        variants: {
          intent: {
            unset: null,
            primary: "button--primary bg-blue-500 text-white border-transparent hover:bg-blue-600",
            secondary: "button--secondary bg-white text-gray-800 border-gray-400 hover:bg-gray-100",
            warning: "button--warning bg-yellow-500 border-transparent hover:bg-yellow-600",
            danger: [ "button--danger", [ 1 && "bg-red-500", {
              baz: false,
              bat: null,
            }, [ "text-white", [ "border-transparent" ] ] ], "hover:bg-red-600" ],
          },
          disabled: {
            unset: null,
            true: "button--disabled opacity-050 cursor-not-allowed",
            false: "button--enabled cursor-pointer",
          },
          size: {
            unset: null,
            small: "button--small text-sm py-1 px-2",
            medium: "button--medium text-base py-2 px-4",
            large: "button--large text-lg py-2.5 px-4",
          },
          m: {
            unset: null,
            0: "m-0",
            1: "m-1",
          },
        },
        compoundVariants: [
          {
            intent: "primary",
            size: "medium",
            class: "button--primary-medium uppercase",
          },
          {
            intent: "warning",
            disabled: false,
            class: "button--warning-enabled text-gray-800",
          },
          {
            intent: "warning",
            disabled: true,
            class: [ "button--warning-disabled", [ 1 && "text-black", {
              baz: false,
              bat: null,
            } ] ],
          },
          {
            intent: [ "warning", "danger" ],
            class: "button--warning-danger !border-red-500",
          },
          {
            intent: [ "warning", "danger" ],
            size: "medium",
            class: "button--warning-danger-medium",
          },
        ],
        defaultVariants: {
          m: 0,
          disabled: false,
          intent: "primary",
          size: "medium",
        },
      } );
      const buttonWithoutBaseWithDefaultsWithClassNameString = bato( {
        base: "button font-semibold border rounded",
        variants: {
          intent: {
            unset: null,
            primary: "button--primary bg-blue-500 text-white border-transparent hover:bg-blue-600",
            secondary: "button--secondary bg-white text-gray-800 border-gray-400 hover:bg-gray-100",
            warning: "button--warning bg-yellow-500 border-transparent hover:bg-yellow-600",
            danger: [ "button--danger", [ 1 && "bg-red-500", {
              baz: false,
              bat: null,
            }, [ "text-white", [ "border-transparent" ] ] ], "hover:bg-red-600" ],
          },
          disabled: {
            unset: null,
            true: "button--disabled opacity-050 cursor-not-allowed",
            false: "button--enabled cursor-pointer",
          },
          size: {
            unset: null,
            small: "button--small text-sm py-1 px-2",
            medium: "button--medium text-base py-2 px-4",
            large: "button--large text-lg py-2.5 px-4",
          },
          m: {
            unset: null,
            0: "m-0",
            1: "m-1",
          },
        },
        compoundVariants: [
          {
            intent: "primary",
            size: "medium",
            className: "button--primary-medium uppercase",
          },
          {
            intent: "warning",
            disabled: false,
            className: "button--warning-enabled text-gray-800",
          },
          {
            intent: "warning",
            disabled: true,
            className: [ "button--warning-disabled", [ 1 && "text-black", {
              baz: false,
              bat: null,
            } ] ],
          },
          {
            intent: [ "warning", "danger" ],
            className: "button--warning-danger !border-red-500",
          },
          {
            intent: [ "warning", "danger" ],
            size: "medium",
            className: "button--warning-danger-medium",
          },
        ],
        defaultVariants: {
          m: 0,
          disabled: false,
          intent: "primary",
          size: "medium",
        },
      } );

      const buttonWithoutBaseWithDefaultsArray = bato( {
        base: [ "button", "font-semibold", "border", "rounded" ],
        variants: {
          intent: {
            unset: null,
            primary: [
              "button--primary",
              "bg-blue-500",
              "text-white",
              "border-transparent",
              "hover:bg-blue-600",
            ],
            secondary: [
              "button--secondary",
              "bg-white",
              "text-gray-800",
              "border-gray-400",
              "hover:bg-gray-100",
            ],
            warning: [
              "button--warning",
              "bg-yellow-500",
              "border-transparent",
              "hover:bg-yellow-600",
            ],
            danger: [ "button--danger", [ 1 && "bg-red-500", {
              baz: false,
              bat: null,
            }, [ "text-white", [ "border-transparent" ] ] ], "hover:bg-red-600" ],
          },
          disabled: {
            unset: null,
            true: [ "button--disabled", "opacity-050", "cursor-not-allowed" ],
            false: [ "button--enabled", "cursor-pointer" ],
          },
          size: {
            unset: null,
            small: [ "button--small", "text-sm", "py-1", "px-2" ],
            medium: [ "button--medium", "text-base", "py-2", "px-4" ],
            large: [ "button--large", "text-lg", "py-2.5", "px-4" ],
          },
          m: {
            unset: null,
            0: "m-0",
            1: "m-1",
          },
        },
        compoundVariants: [
          {
            intent: "primary",
            size: "medium",
            class: [ "button--primary-medium", "uppercase" ],
          },
          {
            intent: "warning",
            disabled: false,
            class: [ "button--warning-enabled", "text-gray-800" ],
          },
          {
            intent: "warning",
            disabled: true,
            class: [ "button--warning-disabled", [ 1 && "text-black", {
              baz: false,
              bat: null,
            } ] ],
          },
          {
            intent: [ "warning", "danger" ],
            class: [ "button--warning-danger", "!border-red-500" ],
          },
          {
            intent: [ "warning", "danger" ],
            size: "medium",
            class: [ "button--warning-danger-medium" ],
          },
        ],
        defaultVariants: {
          m: 0,
          disabled: false,
          intent: "primary",
          size: "medium",
        },
      } );
      const buttonWithoutBaseWithDefaultsWithClassNameArray = bato( {
        base: [ "button", "font-semibold", "border", "rounded" ],
        variants: {
          intent: {
            unset: null,
            primary: [
              "button--primary",
              "bg-blue-500",
              "text-white",
              "border-transparent",
              "hover:bg-blue-600",
            ],
            secondary: [
              "button--secondary",
              "bg-white",
              "text-gray-800",
              "border-gray-400",
              "hover:bg-gray-100",
            ],
            warning: [
              "button--warning",
              "bg-yellow-500",
              "border-transparent",
              "hover:bg-yellow-600",
            ],
            danger: [ "button--danger", [ 1 && "bg-red-500", {
              baz: false,
              bat: null,
            }, [ "text-white", [ "border-transparent" ] ] ], "hover:bg-red-600" ],
          },
          disabled: {
            unset: null,
            true: [ "button--disabled", "opacity-050", "cursor-not-allowed" ],
            false: [ "button--enabled", "cursor-pointer" ],
          },
          size: {
            unset: null,
            small: [ "button--small", "text-sm", "py-1", "px-2" ],
            medium: [ "button--medium", "text-base", "py-2", "px-4" ],
            large: [ "button--large", "text-lg", "py-2.5", "px-4" ],
          },
          m: {
            unset: null,
            0: "m-0",
            1: "m-1",
          },
        },
        compoundVariants: [
          {
            intent: "primary",
            size: "medium",
            className: [ "button--primary-medium", "uppercase" ],
          },
          {
            intent: "warning",
            disabled: false,
            className: [ "button--warning-enabled", "text-gray-800" ],
          },
          {
            intent: "warning",
            disabled: true,
            className: [ "button--warning-disabled", [ 1 && "text-black", {
              baz: false,
              bat: null,
            } ] ],
          },
          {
            intent: [ "warning", "danger" ],
            className: "button--warning-danger !border-red-500",
          },
          {
            intent: [ "warning", "danger" ],
            size: "medium",
            className: "button--warning-danger-medium",
          },
        ],
        defaultVariants: {
          m: 0,
          disabled: false,
          intent: "primary",
          size: "medium",
        },
      } );

      type ButtonWithoutBaseWithDefaultsProps =
        | BatoProps<typeof buttonWithoutBaseWithDefaultsString>
        | BatoProps<typeof buttonWithoutBaseWithDefaultsWithClassNameString>
        | BatoProps<typeof buttonWithoutBaseWithDefaultsArray>
        | BatoProps<typeof buttonWithoutBaseWithDefaultsWithClassNameArray>;

      // describe.each<[ ButtonWithoutBaseWithDefaultsProps, string ]>( [
      //   [
      //     // @ts-expect-error must be a type error
      //     undefined,
      //     "button font-semibold border rounded button--primary bg-blue-500 text-white border-transparent hover:bg-blue-600 button--enabled cursor-pointer button--medium text-base py-2 px-4 m-0 button--primary-medium uppercase",
      //   ],
      //   [
      //     {},
      //     "button font-semibold border rounded button--primary bg-blue-500 text-white border-transparent hover:bg-blue-600 button--enabled cursor-pointer button--medium text-base py-2 px-4 m-0 button--primary-medium uppercase",
      //   ],
      //   [
      //     {
      //       aCheekyInvalidProp: "lol",
      //     } as ButtonWithoutBaseWithDefaultsProps,
      //     "button font-semibold border rounded button--primary bg-blue-500 text-white border-transparent hover:bg-blue-600 button--enabled cursor-pointer button--medium text-base py-2 px-4 m-0 button--primary-medium uppercase",
      //   ],
      //   [
      //     { intent: "secondary" },
      //     "button font-semibold border rounded button--secondary bg-white text-gray-800 border-gray-400 hover:bg-gray-100 button--enabled cursor-pointer button--medium text-base py-2 px-4 m-0",
      //   ],

      //   [
      //     { size: "small" },
      //     "button font-semibold border rounded button--primary bg-blue-500 text-white border-transparent hover:bg-blue-600 button--enabled cursor-pointer button--small text-sm py-1 px-2 m-0",
      //   ],
      //   [
      //     { disabled: true },
      //     "button font-semibold border rounded button--primary bg-blue-500 text-white border-transparent hover:bg-blue-600 button--disabled opacity-050 cursor-not-allowed button--medium text-base py-2 px-4 m-0 button--primary-medium uppercase",
      //   ],
      //   [
      //     {
      //       intent: "secondary",
      //       size: "unset",
      //     },
      //     "button font-semibold border rounded button--secondary bg-white text-gray-800 border-gray-400 hover:bg-gray-100 button--enabled cursor-pointer m-0",
      //   ],
      //   [
      //     { intent: "secondary", size: undefined },
      //     "button font-semibold border rounded button--secondary bg-white text-gray-800 border-gray-400 hover:bg-gray-100 button--enabled cursor-pointer button--medium text-base py-2 px-4 m-0",
      //   ],
      //   [
      //     { intent: "danger", size: "medium" },
      //     "button font-semibold border rounded button--danger bg-red-500 text-white border-transparent hover:bg-red-600 button--enabled cursor-pointer button--medium text-base py-2 px-4 m-0 button--warning-danger !border-red-500 button--warning-danger-medium",
      //   ],
      //   [
      //     { intent: "warning", size: "large" },
      //     "button font-semibold border rounded button--warning bg-yellow-500 border-transparent hover:bg-yellow-600 button--enabled cursor-pointer button--large text-lg py-2.5 px-4 m-0 button--warning-enabled text-gray-800 button--warning-danger !border-red-500",
      //   ],
      //   [
      //     { intent: "warning", size: "large", disabled: true },
      //     "button font-semibold border rounded button--warning bg-yellow-500 border-transparent hover:bg-yellow-600 button--disabled opacity-050 cursor-not-allowed button--large text-lg py-2.5 px-4 m-0 button--warning-disabled text-black button--warning-danger !border-red-500",
      //   ],
      //   [
      //     { intent: "primary", m: 0 },
      //     "button font-semibold border rounded button--primary bg-blue-500 text-white border-transparent hover:bg-blue-600 button--enabled cursor-pointer button--medium text-base py-2 px-4 m-0 button--primary-medium uppercase",
      //   ],
      //   [
      //     { intent: "primary", m: 1 },
      //     "button font-semibold border rounded button--primary bg-blue-500 text-white border-transparent hover:bg-blue-600 button--enabled cursor-pointer button--medium text-base py-2 px-4 m-1 button--primary-medium uppercase",
      //   ],
      //   // !@TODO Add type "extractor" including class prop
      //   [
      //     {
      //       intent: "primary",
      //       m: 0,
      //       class: "adhoc-class",
      //     } as ButtonWithoutBaseWithDefaultsProps,
      //     "button font-semibold border rounded button--primary bg-blue-500 text-white border-transparent hover:bg-blue-600 button--enabled cursor-pointer button--medium text-base py-2 px-4 m-0 button--primary-medium uppercase adhoc-class",
      //   ],
      //   [
      //     {
      //       intent: "primary",
      //       m: 1,
      //       className: "adhoc-classname",
      //     } as ButtonWithoutBaseWithDefaultsProps,
      //     "button font-semibold border rounded button--primary bg-blue-500 text-white border-transparent hover:bg-blue-600 button--enabled cursor-pointer button--medium text-base py-2 px-4 m-1 button--primary-medium uppercase adhoc-classname",
      //   ],
      // ] )( "button(%o)", ( options, expected ) => {
      //   test(`returns ${expected}`, () => {
      //     expect( buttonWithoutBaseWithDefaultsString( options ) ).toBe( expected );
      //     expect( buttonWithoutBaseWithDefaultsWithClassNameString( options ) )
      //       .toBe( expected );
      //     expect( buttonWithoutBaseWithDefaultsArray( options ) ).toBe( expected );
      //     expect( buttonWithoutBaseWithDefaultsWithClassNameArray( options ) ).toBe(
      //       expected,
      //     );
      //   });
      // } );
    });
  });

  describe("with base", () => {
    describe("without defaults", () => {
      const buttonWithBaseWithoutDefaultsString = bato( {
        base: "button font-semibold border rounded",
        variants: {
          intent: {
            unset: null,
            primary: "button--primary bg-blue-500 text-white border-transparent hover:bg-blue-600",
            secondary: "button--secondary bg-white text-gray-800 border-gray-400 hover:bg-gray-100",
            warning: "button--warning bg-yellow-500 border-transparent hover:bg-yellow-600",
            danger: [ "button--danger", [ 1 && "bg-red-500", {
              baz: false,
              bat: null,
            }, [ "text-white", [ "border-transparent" ] ] ], "hover:bg-red-600" ],
          },
          disabled: {
            unset: null,
            true: "button--disabled opacity-050 cursor-not-allowed",
            false: "button--enabled cursor-pointer",
          },
          size: {
            unset: null,
            small: "button--small text-sm py-1 px-2",
            medium: "button--medium text-base py-2 px-4",
            large: "button--large text-lg py-2.5 px-4",
          },
        },
        compoundVariants: [
          {
            intent: "primary",
            size: "medium",
            class: "button--primary-medium uppercase",
          },
          {
            intent: "warning",
            disabled: false,
            class: "button--warning-enabled text-gray-800",
          },
          {
            intent: "warning",
            disabled: true,
            class: [ "button--warning-disabled", [ 1 && "text-black", {
              baz: false,
              bat: null,
            } ] ],
          },
          {
            intent: [ "warning", "danger" ],
            class: "button--warning-danger !border-red-500",
          },
          {
            intent: [ "warning", "danger" ],
            size: "medium",
            class: "button--warning-danger-medium",
          },
        ],
      } );
      const buttonWithBaseWithoutDefaultsWithClassNameString = bato( {
        base: "button font-semibold border rounded",
        variants: {
          intent: {
            unset: null,
            primary: "button--primary bg-blue-500 text-white border-transparent hover:bg-blue-600",
            secondary: "button--secondary bg-white text-gray-800 border-gray-400 hover:bg-gray-100",
            warning: "button--warning bg-yellow-500 border-transparent hover:bg-yellow-600",
            danger: [ "button--danger", [ 1 && "bg-red-500", {
              baz: false,
              bat: null,
            }, [ "text-white", [ "border-transparent" ] ] ], "hover:bg-red-600" ],
          },
          disabled: {
            unset: null,
            true: "button--disabled opacity-050 cursor-not-allowed",
            false: "button--enabled cursor-pointer",
          },
          size: {
            unset: null,
            small: "button--small text-sm py-1 px-2",
            medium: "button--medium text-base py-2 px-4",
            large: "button--large text-lg py-2.5 px-4",
          },
        },
        compoundVariants: [
          {
            intent: "primary",
            size: "medium",
            className: "button--primary-medium uppercase",
          },
          {
            intent: "warning",
            disabled: false,
            className: "button--warning-enabled text-gray-800",
          },
          {
            intent: "warning",
            disabled: true,
            className: [ "button--warning-disabled", [ 1 && "text-black", {
              baz: false,
              bat: null,
            } ] ],
          },
          {
            intent: [ "warning", "danger" ],
            className: "button--warning-danger !border-red-500",
          },
          {
            intent: [ "warning", "danger" ],
            size: "medium",
            className: "button--warning-danger-medium",
          },
        ],
      } );

      const buttonWithBaseWithoutDefaultsArray = bato( {
        base: [ "button", "font-semibold", "border", "rounded" ],
        variants: {
          intent: {
            unset: null,
            primary: [
              "button--primary",
              "bg-blue-500",
              "text-white",
              "border-transparent",
              "hover:bg-blue-600",
            ],
            secondary: [
              "button--secondary",
              "bg-white",
              "text-gray-800",
              "border-gray-400",
              "hover:bg-gray-100",
            ],
            warning: [
              "button--warning",
              "bg-yellow-500",
              "border-transparent",
              "hover:bg-yellow-600",
            ],
            danger: [ "button--danger", [ 1 && "bg-red-500", {
              baz: false,
              bat: null,
            }, [ "text-white", [ "border-transparent" ] ] ], "hover:bg-red-600" ],
          },
          disabled: {
            unset: null,
            true: [ "button--disabled", "opacity-050", "cursor-not-allowed" ],
            false: [ "button--enabled", "cursor-pointer" ],
          },
          size: {
            unset: null,
            small: [ "button--small", "text-sm", "py-1", "px-2" ],
            medium: [ "button--medium", "text-base", "py-2", "px-4" ],
            large: [ "button--large", "text-lg", "py-2.5", "px-4" ],
          },
        },
        compoundVariants: [
          {
            intent: "primary",
            size: "medium",
            class: [ "button--primary-medium", "uppercase" ],
          },
          {
            intent: "warning",
            disabled: false,
            class: [ "button--warning-enabled", "text-gray-800" ],
          },
          {
            intent: "warning",
            disabled: true,
            class: [ "button--warning-disabled", [ 1 && "text-black", {
              baz: false,
              bat: null,
            } ] ],
          },
          {
            intent: [ "warning", "danger" ],
            class: [ "button--warning-danger", "!border-red-500" ],
          },
          {
            intent: [ "warning", "danger" ],
            size: "medium",
            class: [ "button--warning-danger-medium" ],
          },
        ],
      } );
      const buttonWithBaseWithoutDefaultsWithClassNameArray = bato( {
        base: [ "button", "font-semibold", "border", "rounded" ],
        variants: {
          intent: {
            unset: null,
            primary: [
              "button--primary",
              "bg-blue-500",
              "text-white",
              "border-transparent",
              "hover:bg-blue-600",
            ],
            secondary: [
              "button--secondary",
              "bg-white",
              "text-gray-800",
              "border-gray-400",
              "hover:bg-gray-100",
            ],
            warning: [
              "button--warning",
              "bg-yellow-500",
              "border-transparent",
              "hover:bg-yellow-600",
            ],
            danger: [ "button--danger", [ 1 && "bg-red-500", {
              baz: false,
              bat: null,
            }, [ "text-white", [ "border-transparent" ] ] ], "hover:bg-red-600" ],
          },
          disabled: {
            unset: null,
            true: [ "button--disabled", "opacity-050", "cursor-not-allowed" ],
            false: [ "button--enabled", "cursor-pointer" ],
          },
          size: {
            unset: null,
            small: [ "button--small", "text-sm", "py-1", "px-2" ],
            medium: [ "button--medium", "text-base", "py-2", "px-4" ],
            large: [ "button--large", "text-lg", "py-2.5", "px-4" ],
          },
        },
        compoundVariants: [
          {
            intent: "primary",
            size: "medium",
            className: [ "button--primary-medium", "uppercase" ],
          },
          {
            intent: "warning",
            disabled: false,
            className: [ "button--warning-enabled", "text-gray-800" ],
          },
          {
            intent: "warning",
            disabled: true,
            className: [ "button--warning-disabled", [ 1 && "text-black", {
              baz: false,
              bat: null,
            } ] ],
          },
          {
            intent: [ "warning", "danger" ],
            className: [ "button--warning-danger", "!border-red-500" ],
          },
          {
            intent: [ "warning", "danger" ],
            size: "medium",
            className: [ "button--warning-danger-medium" ],
          },
        ],
      } );

      type ButtonWithBaseWithoutDefaultsProps =
        | BatoProps<typeof buttonWithBaseWithoutDefaultsString>
        | BatoProps<typeof buttonWithBaseWithoutDefaultsWithClassNameString>
        | BatoProps<typeof buttonWithBaseWithoutDefaultsArray>
        | BatoProps<typeof buttonWithBaseWithoutDefaultsWithClassNameArray>;

      // describe.each<[ ButtonWithBaseWithoutDefaultsProps, string ]>( [
      //   [
      //     undefined as unknown as ButtonWithBaseWithoutDefaultsProps,
      //     "button font-semibold border rounded",
      //   ],
      //   [ {}, "button font-semibold border rounded" ],
      //   [
      //     {
      //       // @ts-expect-error must be a type error
      //       aCheekyInvalidProp: "lol",
      //     },
      //     "button font-semibold border rounded",
      //   ],
      //   [
      //     { intent: "secondary" },
      //     "button font-semibold border rounded button--secondary bg-white text-gray-800 border-gray-400 hover:bg-gray-100",
      //   ],

      //   [
      //     { size: "small" },
      //     "button font-semibold border rounded button--small text-sm py-1 px-2",
      //   ],
      //   [
      //     { disabled: false },
      //     "button font-semibold border rounded button--enabled cursor-pointer",
      //   ],
      //   [
      //     { disabled: true },
      //     "button font-semibold border rounded button--disabled opacity-050 cursor-not-allowed",
      //   ],
      //   [
      //     { intent: "secondary", size: "unset" },
      //     "button font-semibold border rounded button--secondary bg-white text-gray-800 border-gray-400 hover:bg-gray-100",
      //   ],
      //   [
      //     { intent: "secondary", size: undefined },
      //     "button font-semibold border rounded button--secondary bg-white text-gray-800 border-gray-400 hover:bg-gray-100",
      //   ],
      //   [
      //     { intent: "danger", size: "medium" },
      //     "button font-semibold border rounded button--danger bg-red-500 text-white border-transparent hover:bg-red-600 button--medium text-base py-2 px-4 button--warning-danger !border-red-500 button--warning-danger-medium",
      //   ],
      //   [
      //     { intent: "warning", size: "large" },
      //     "button font-semibold border rounded button--warning bg-yellow-500 border-transparent hover:bg-yellow-600 button--large text-lg py-2.5 px-4 button--warning-danger !border-red-500",
      //   ],
      //   [
      //     { intent: "warning", size: "large", disabled: "unset" },
      //     "button font-semibold border rounded button--warning bg-yellow-500 border-transparent hover:bg-yellow-600 button--large text-lg py-2.5 px-4 button--warning-danger !border-red-500",
      //   ],
      //   [
      //     { intent: "warning", size: "large", disabled: true },
      //     "button font-semibold border rounded button--warning bg-yellow-500 border-transparent hover:bg-yellow-600 button--disabled opacity-050 cursor-not-allowed button--large text-lg py-2.5 px-4 button--warning-disabled text-black button--warning-danger !border-red-500",
      //   ],
      //   [
      //     { intent: "warning", size: "large", disabled: false },
      //     "button font-semibold border rounded button--warning bg-yellow-500 border-transparent hover:bg-yellow-600 button--enabled cursor-pointer button--large text-lg py-2.5 px-4 button--warning-enabled text-gray-800 button--warning-danger !border-red-500",
      //   ],
      //   // !@TODO Add type "extractor" including class prop
      //   [
      //     {
      //       intent: "primary",
      //       class: "adhoc-class",
      //     } as ButtonWithBaseWithoutDefaultsProps,
      //     "button font-semibold border rounded button--primary bg-blue-500 text-white border-transparent hover:bg-blue-600 adhoc-class",
      //   ],
      //   [
      //     {
      //       intent: "primary",
      //       className: "adhoc-className",
      //     } as ButtonWithBaseWithoutDefaultsProps,
      //     "button font-semibold border rounded button--primary bg-blue-500 text-white border-transparent hover:bg-blue-600 adhoc-className",
      //   ],
      // ] )( "button(%o)", ( options, expected ) => {
      //   test(`returns ${expected}`, () => {
      //     expect( buttonWithBaseWithoutDefaultsString( options ) ).toBe( expected );
      //     expect( buttonWithBaseWithoutDefaultsWithClassNameString( options ) )
      //       .toBe( expected );
      //     expect( buttonWithBaseWithoutDefaultsArray( options ) ).toBe( expected );
      //     expect( buttonWithBaseWithoutDefaultsWithClassNameArray( options ) ).toBe(
      //       expected,
      //     );
      //   });
      // } );
    });

    describe("with defaults", () => {
      const buttonWithBaseWithDefaultsString = bato( {
        base: "button font-semibold border rounded",
        variants: {
          intent: {
            unset: null,
            primary: "button--primary bg-blue-500 text-white border-transparent hover:bg-blue-600",
            secondary: "button--secondary bg-white text-gray-800 border-gray-400 hover:bg-gray-100",
            warning: "button--warning bg-yellow-500 border-transparent hover:bg-yellow-600",
            danger: [ "button--danger", [ 1 && "bg-red-500", {
              baz: false,
              bat: null,
            }, [ "text-white", [ "border-transparent" ] ] ], "hover:bg-red-600" ],
          },
          disabled: {
            unset: null,
            true: "button--disabled opacity-050 cursor-not-allowed",
            false: "button--enabled cursor-pointer",
          },
          size: {
            unset: null,
            small: "button--small text-sm py-1 px-2",
            medium: "button--medium text-base py-2 px-4",
            large: "button--large text-lg py-2.5 px-4",
          },
        },
        compoundVariants: [
          {
            intent: "primary",
            size: "medium",
            class: "button--primary-medium uppercase",
          },
          {
            intent: "warning",
            disabled: false,
            class: "button--warning-enabled text-gray-800",
          },
          {
            intent: "warning",
            disabled: true,
            class: [ "button--warning-disabled", [ 1 && "text-black", {
              baz: false,
              bat: null,
            } ] ],
          },
          {
            intent: [ "warning", "danger" ],
            class: "button--warning-danger !border-red-500",
          },
          {
            intent: [ "warning", "danger" ],
            size: "medium",
            class: "button--warning-danger-medium",
          },
        ],
        defaultVariants: {
          disabled: false,
          intent: "primary",
          size: "medium",
        },
      } );
      const buttonWithBaseWithDefaultsWithClassNameString = bato( {
        base: "button font-semibold border rounded",
        variants: {
          intent: {
            unset: null,
            primary: "button--primary bg-blue-500 text-white border-transparent hover:bg-blue-600",
            secondary: "button--secondary bg-white text-gray-800 border-gray-400 hover:bg-gray-100",
            warning: "button--warning bg-yellow-500 border-transparent hover:bg-yellow-600",
            danger: [ "button--danger", [ 1 && "bg-red-500", {
              baz: false,
              bat: null,
            }, [ "text-white", [ "border-transparent" ] ] ], "hover:bg-red-600" ],
          },
          disabled: {
            unset: null,
            true: "button--disabled opacity-050 cursor-not-allowed",
            false: "button--enabled cursor-pointer",
          },
          size: {
            unset: null,
            small: "button--small text-sm py-1 px-2",
            medium: "button--medium text-base py-2 px-4",
            large: "button--large text-lg py-2.5 px-4",
          },
        },
        compoundVariants: [
          {
            intent: "primary",
            size: "medium",
            className: "button--primary-medium uppercase",
          },
          {
            intent: "warning",
            disabled: false,
            className: "button--warning-enabled text-gray-800",
          },
          {
            intent: "warning",
            disabled: true,
            className: [ "button--warning-disabled", [ 1 && "text-black", {
              baz: false,
              bat: null,
            } ] ],
          },
          {
            intent: [ "warning", "danger" ],
            className: "button--warning-danger !border-red-500",
          },
          {
            intent: [ "warning", "danger" ],
            size: "medium",
            className: "button--warning-danger-medium",
          },
        ],
        defaultVariants: {
          disabled: false,
          intent: "primary",
          size: "medium",
        },
      } );

      const buttonWithBaseWithDefaultsArray = bato( {
        base: [ "button", "font-semibold", "border", "rounded" ],
        variants: {
          intent: {
            unset: null,
            primary: [
              "button--primary",
              "bg-blue-500",
              "text-white",
              "border-transparent",
              "hover:bg-blue-600",
            ],
            secondary: [
              "button--secondary",
              "bg-white",
              "text-gray-800",
              "border-gray-400",
              "hover:bg-gray-100",
            ],
            warning: [
              "button--warning",
              "bg-yellow-500",
              "border-transparent",
              "hover:bg-yellow-600",
            ],
            danger: [ "button--danger", [ 1 && "bg-red-500", {
              baz: false,
              bat: null,
            }, [ "text-white", [ "border-transparent" ] ] ], "hover:bg-red-600" ],
          },
          disabled: {
            unset: null,
            true: [ "button--disabled", "opacity-050", "cursor-not-allowed" ],
            false: [ "button--enabled", "cursor-pointer" ],
          },
          size: {
            unset: null,
            small: [ "button--small", "text-sm", "py-1", "px-2" ],
            medium: [ "button--medium", "text-base", "py-2", "px-4" ],
            large: [ "button--large", "text-lg", "py-2.5", "px-4" ],
          },
        },
        compoundVariants: [
          {
            intent: "primary",
            size: "medium",
            class: [ "button--primary-medium", "uppercase" ],
          },
          {
            intent: "warning",
            disabled: false,
            class: [ "button--warning-enabled", "text-gray-800" ],
          },
          {
            intent: "warning",
            disabled: true,
            class: [ "button--warning-disabled", [ 1 && "text-black", {
              baz: false,
              bat: null,
            } ] ],
          },
          {
            intent: [ "warning", "danger" ],
            class: [ "button--warning-danger", "!border-red-500" ],
          },
          {
            intent: [ "warning", "danger" ],
            size: "medium",
            class: [ "button--warning-danger-medium" ],
          },
        ],
        defaultVariants: {
          disabled: false,
          intent: "primary",
          size: "medium",
        },
      } );
      const buttonWithBaseWithDefaultsWithClassNameArray = bato( {
        base: [ "button", "font-semibold", "border", "rounded" ],
        variants: {
          intent: {
            unset: null,
            primary: [
              "button--primary",
              "bg-blue-500",
              "text-white",
              "border-transparent",
              "hover:bg-blue-600",
            ],
            secondary: [
              "button--secondary",
              "bg-white",
              "text-gray-800",
              "border-gray-400",
              "hover:bg-gray-100",
            ],
            warning: [
              "button--warning",
              "bg-yellow-500",
              "border-transparent",
              "hover:bg-yellow-600",
            ],
            danger: [ "button--danger", [ 1 && "bg-red-500", {
              baz: false,
              bat: null,
            }, [ "text-white", [ "border-transparent" ] ] ], "hover:bg-red-600" ],
          },
          disabled: {
            unset: null,
            true: [ "button--disabled", "opacity-050", "cursor-not-allowed" ],
            false: [ "button--enabled", "cursor-pointer" ],
          },
          size: {
            unset: null,
            small: [ "button--small", "text-sm", "py-1", "px-2" ],
            medium: [ "button--medium", "text-base", "py-2", "px-4" ],
            large: [ "button--large", "text-lg", "py-2.5", "px-4" ],
          },
        },
        compoundVariants: [
          {
            intent: "primary",
            size: "medium",
            className: [ "button--primary-medium", "uppercase" ],
          },
          {
            intent: "warning",
            disabled: false,
            className: [ "button--warning-enabled", "text-gray-800" ],
          },
          {
            intent: "warning",
            disabled: true,
            className: [ "button--warning-disabled", [ 1 && "text-black", {
              baz: false,
              bat: null,
            } ] ],
          },
          {
            intent: [ "warning", "danger" ],
            className: [ "button--warning-danger", "!border-red-500" ],
          },
          {
            intent: [ "warning", "danger" ],
            size: "medium",
            className: [ "button--warning-danger-medium" ],
          },
        ],
        defaultVariants: {
          disabled: false,
          intent: "primary",
          size: "medium",
        },
      } );

      type ButtonWithBaseWithDefaultsProps =
        | BatoProps<typeof buttonWithBaseWithDefaultsString>
        | BatoProps<typeof buttonWithBaseWithDefaultsWithClassNameString>
        | BatoProps<typeof buttonWithBaseWithDefaultsArray>
        | BatoProps<typeof buttonWithBaseWithDefaultsWithClassNameArray>;

      // describe.each<[ ButtonWithBaseWithDefaultsProps, string ]>( [
      //   [
      //     // @ts-expect-error must be a type error
      //     undefined,
      //     "button font-semibold border rounded button--primary bg-blue-500 text-white border-transparent hover:bg-blue-600 button--enabled cursor-pointer button--medium text-base py-2 px-4 button--primary-medium uppercase",
      //   ],
      //   [
      //     {},
      //     "button font-semibold border rounded button--primary bg-blue-500 text-white border-transparent hover:bg-blue-600 button--enabled cursor-pointer button--medium text-base py-2 px-4 button--primary-medium uppercase",
      //   ],
      //   [
      //     {
      //       aCheekyInvalidProp: "lol",
      //     } as ButtonWithBaseWithDefaultsProps,
      //     "button font-semibold border rounded button--primary bg-blue-500 text-white border-transparent hover:bg-blue-600 button--enabled cursor-pointer button--medium text-base py-2 px-4 button--primary-medium uppercase",
      //   ],
      //   [
      //     { intent: "secondary" },
      //     "button font-semibold border rounded button--secondary bg-white text-gray-800 border-gray-400 hover:bg-gray-100 button--enabled cursor-pointer button--medium text-base py-2 px-4",
      //   ],

      //   [
      //     { size: "small" },
      //     "button font-semibold border rounded button--primary bg-blue-500 text-white border-transparent hover:bg-blue-600 button--enabled cursor-pointer button--small text-sm py-1 px-2",
      //   ],
      //   [
      //     { disabled: "unset" },
      //     "button font-semibold border rounded button--primary bg-blue-500 text-white border-transparent hover:bg-blue-600 button--medium text-base py-2 px-4 button--primary-medium uppercase",
      //   ],
      //   [
      //     { disabled: false },
      //     "button font-semibold border rounded button--primary bg-blue-500 text-white border-transparent hover:bg-blue-600 button--enabled cursor-pointer button--medium text-base py-2 px-4 button--primary-medium uppercase",
      //   ],
      //   [
      //     { disabled: true },
      //     "button font-semibold border rounded button--primary bg-blue-500 text-white border-transparent hover:bg-blue-600 button--disabled opacity-050 cursor-not-allowed button--medium text-base py-2 px-4 button--primary-medium uppercase",
      //   ],
      //   [
      //     { intent: "secondary", size: "unset" },
      //     "button font-semibold border rounded button--secondary bg-white text-gray-800 border-gray-400 hover:bg-gray-100 button--enabled cursor-pointer",
      //   ],
      //   [
      //     { intent: "secondary", size: undefined },
      //     "button font-semibold border rounded button--secondary bg-white text-gray-800 border-gray-400 hover:bg-gray-100 button--enabled cursor-pointer button--medium text-base py-2 px-4",
      //   ],
      //   [
      //     { intent: "danger", size: "medium" },
      //     "button font-semibold border rounded button--danger bg-red-500 text-white border-transparent hover:bg-red-600 button--enabled cursor-pointer button--medium text-base py-2 px-4 button--warning-danger !border-red-500 button--warning-danger-medium",
      //   ],
      //   [
      //     { intent: "warning", size: "large" },
      //     "button font-semibold border rounded button--warning bg-yellow-500 border-transparent hover:bg-yellow-600 button--enabled cursor-pointer button--large text-lg py-2.5 px-4 button--warning-enabled text-gray-800 button--warning-danger !border-red-500",
      //   ],
      //   [
      //     {
      //       intent: "warning",
      //       size: "large",
      //       disabled: "unset",
      //     },
      //     "button font-semibold border rounded button--warning bg-yellow-500 border-transparent hover:bg-yellow-600 button--large text-lg py-2.5 px-4 button--warning-danger !border-red-500",
      //   ],
      //   [
      //     { intent: "warning", size: "large", disabled: true },
      //     "button font-semibold border rounded button--warning bg-yellow-500 border-transparent hover:bg-yellow-600 button--disabled opacity-050 cursor-not-allowed button--large text-lg py-2.5 px-4 button--warning-disabled text-black button--warning-danger !border-red-500",
      //   ],
      //   [
      //     { intent: "warning", size: "large", disabled: false },
      //     "button font-semibold border rounded button--warning bg-yellow-500 border-transparent hover:bg-yellow-600 button--enabled cursor-pointer button--large text-lg py-2.5 px-4 button--warning-enabled text-gray-800 button--warning-danger !border-red-500",
      //   ],
      //   // !@TODO Add type "extractor" including class prop
      //   [
      //     {
      //       intent: "primary",
      //       class: "adhoc-class",
      //     } as ButtonWithBaseWithDefaultsProps,
      //     "button font-semibold border rounded button--primary bg-blue-500 text-white border-transparent hover:bg-blue-600 button--enabled cursor-pointer button--medium text-base py-2 px-4 button--primary-medium uppercase adhoc-class",
      //   ],
      //   [
      //     {
      //       intent: "primary",
      //       className: "adhoc-classname",
      //     } as ButtonWithBaseWithDefaultsProps,
      //     "button font-semibold border rounded button--primary bg-blue-500 text-white border-transparent hover:bg-blue-600 button--enabled cursor-pointer button--medium text-base py-2 px-4 button--primary-medium uppercase adhoc-classname",
      //   ],
      // ] )( "button(%o)", ( options, expected ) => {
      //   test(`returns ${expected}`, () => {
      //     expect( buttonWithBaseWithDefaultsString( options ) ).toBe( expected );
      //     expect( buttonWithBaseWithDefaultsWithClassNameString( options ) ).toBe(
      //       expected,
      //     );
      //     expect( buttonWithBaseWithDefaultsArray( options ) ).toBe( expected );
      //     expect( buttonWithBaseWithDefaultsWithClassNameArray( options ) ).toBe(
      //       expected,
      //     );
      //   });
      // } );
    });
  });
});

describe("assemble", () => {
  describe("hooks", () => {
    describe("onComplete", () => {
      const prefix = "never-gonna-give-you-up";
      const suffix = "never-gonna-let-you-down";

      const onCompleteHandler = ( className: string ) => [ prefix, className, suffix ].join( " " );

      test("should extend compose", () => {
        const { compose: composeExtended } = assemble( {
          hooks: {
            onComplete: onCompleteHandler,
          },
        } );

        const box = bato( {
          variants: {
            shadow: {
              sm: "shadow-sm",
              md: "shadow-md",
            },
          },
          defaultVariants: {
            shadow: "sm",
          },
        } );
        const stack = bato( {
          variants: {
            gap: {
              unset: null,
              1: "gap-1",
              2: "gap-2",
              3: "gap-3",
            },
          },
          defaultVariants: {
            gap: "unset",
          },
        } );
        const card = composeExtended( box, stack );

        // expectTypeOf( card ).toBeFunction();

        const cardClassList = card();
        const cardClassListSplit = cardClassList.split( " " );
        expect( cardClassListSplit[0] ).toBe( prefix );
        expect( cardClassListSplit[cardClassListSplit.length - 1] ).toBe( suffix );

        const cardShadowGapClassList = card( { shadow: "md", gap: 3 } );
        const cardShadowGapClassListSplit = cardShadowGapClassList.split( " " );
        expect( cardShadowGapClassListSplit[0] ).toBe( prefix );
        expect(
          cardShadowGapClassListSplit[cardShadowGapClassListSplit.length - 1],
        ).toBe( suffix );
      });

      test("should extend bato", () => {
        const { bato: batoExtended } = assemble( {
          hooks: {
            onComplete: onCompleteHandler,
          },
        } );

        const component = batoExtended( {
          base: "foo",
          variants: { intent: { primary: "bar" } },
        } );
        const componentClassList = component( { intent: "primary" } );
        const componentClassListSplit = componentClassList.split( " " );

        // expectTypeOf( component ).toBeFunction();
        expect( componentClassListSplit[0] ).toBe( prefix );
        expect( componentClassListSplit[componentClassListSplit.length - 1] )
          .toBe( suffix );
      });

      test("should extend cx", () => {
        const { cx: cxExtended } = assemble( {
          hooks: {
            onComplete: onCompleteHandler,
          },
        } );

        const classList = cxExtended( "foo", "bar" );
        const classListSplit = classList.split( " " );

        // expectTypeOf( classList ).toBeString();
        expect( classListSplit[0] ).toBe( prefix );
        expect( classListSplit[classListSplit.length - 1] ).toBe( suffix );
      });
    });
  });
});
