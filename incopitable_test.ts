import type * as Bato from "@codeandmoney/bato";
import { bato } from "@codeandmoney/bato";
import { describe, test } from "@std/testing/bdd";
import { assertThrows } from "@std/assert";

describe("bato incopitable", () => {
  const withIncopitable = bato( {
    base: "base",

    variants: {
      size: { first: "first", second: "second", third: "third" },
      color: { one: "one", two: "two", three: "three" },
      shape: { solid: "solid", filled: "filled", outline: "outline" },
    },

    compoundVariants: [
      { color: "one", size: "first", className: "three" },
      { color: "two", size: "second", className: "three" },
    ],

    defaultVariants: { color: "two", size: "first" },

    incompatible: {
      size: {
        first: { color: [ "one" ], shape: [ "solid" ] },
      },

      color: {
        two: { shape: [ "filled" ], size: [ "second" ] },
      },

      shape: {
        outline: { color: [ "one", "two" ], size: [ "first", "second" ] },
      },
    },
  } );

  test("allways throws", () => {
    const varints = [
      //size
      { size: "first", color: "one" },
      { size: "first", shape: "solid" },

      // color
      { color: "two", shape: "filled" },
      { color: "two", size: "second" },

      // shape
      { shape: "outline", color: "one" },
      { shape: "outline", color: "two" },
      { shape: "outline", size: "first" },
      { shape: "outline", size: "second" },
    ] satisfies Bato.BatoProps<typeof withIncopitable>[];

    for ( const variant of varints ) {
      assertThrows( () => withIncopitable( variant ) );
    }
  });

  test("never throws", () => {
    const varints = [
      // size
      { size: "first", color: "two" },
      { size: "first", color: "three" },
      { size: "first", shape: "filled" },

      { size: "second", shape: "solid" },
      { size: "second", shape: "filled" },

      { size: "third", shape: "outline" },
      { size: "third", shape: "solid" },

      // color
      { color: "one", shape: "solid" },

      { color: "two", shape: "solid" },

      { color: "three", shape: "solid" },
      { color: "three", shape: "filled" },
      { color: "three", shape: "outline" },

      // shape
      { shape: "solid", color: "one" },
      { shape: "solid", color: "two" },
      { shape: "solid", color: "three" },

      { shape: "solid", size: "second" },
      { shape: "solid", size: "third" },

      { shape: "outline", size: "third" },
      { shape: "outline", color: "three" },
    ] satisfies Bato.BatoProps<typeof withIncopitable>[];

    for ( const variant of varints ) {
      withIncopitable( variant );
    }
  });
});
