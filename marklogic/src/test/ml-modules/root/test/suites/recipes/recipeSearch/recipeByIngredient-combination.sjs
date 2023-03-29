"use strict";

const test = require("/test/test-helper.xqy");
const rec = require("/lib/recipes.sjs");

/**
 * Test case: run searches with multiple inputs.
 */

let assertions = [];

/**
 * Scenario: search for Carapils malt and Nugget hops.
 * Only one recipe has both of these: Philly Special
 */
let actual = rec.recipeByIngredient("Carapils", "Nugget", null, null);

assertions = [
  test.assertTrue(Array.isArray(actual), "Result is expected to be an Array"),
  test.assertEqual(1, actual.length, "Expected to find 1 malt/hop result"),
  test.assertExists(actual[0].baseURI, "Result should have DocumentNodes"),
  test.assertEqual("/recipes/PhillySpecial.json", actual[0].baseURI)
];

/**
 * Scenario: search for Nugget and Citra hops.
 * Make the function handles the array parameter.
 * Only one recipe has both of these: Philly Special
 */
actual = rec.recipeByIngredient(null, ["Nugget", "Citra"], null, null);

assertions.push(
  test.assertTrue(Array.isArray(actual), "Result is expected to be an Array"),
  test.assertEqual(1, actual.length, "Expected to find 1 multi-hop result"),
  test.assertExists(actual[0].baseURI, "Result should have DocumentNodes"),
  test.assertEqual("/recipes/PhillySpecial.json", actual[0].baseURI)
);

assertions;
