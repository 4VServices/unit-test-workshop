"use strict";

const test = require("/test/test-helper.xqy");
const rec = require("/lib/recipes.sjs");

let assertions = [];

/**
 * Scenario: search for Carapils malt.
 * There are two recipes that should match: Heather Maibock and Philly Special.
 */
let actual = rec.recipeByIngredient("Carapils", null, null, null);

assertions = [
  test.assertTrue(Array.isArray(actual), "Result is expected to be an Array"),
  test.assertEqual(2, actual.length, "Expected to find 2 malt results"),
  test.assertExists(actual[0].baseURI, "Result should have DocumentNodes"),
  test.assertSameValues(
    Sequence.from(["/recipes/HeatherMaibock.json", "/recipes/PhillySpecial.json"]),
    Sequence.from(actual.map((result) => result.baseURI))
  )
];

/**
 * Scenario: search for Citra hops. There is one recipe that should match: Philly Special
 */
actual = rec.recipeByIngredient(null, "Citra", null, null);

assertions.push(
  test.assertTrue(Array.isArray(actual), "Result is expected to be an Array"),
  test.assertEqual(1, actual.length, "Expected to find 1 hop result"),
  test.assertExists(actual[0].baseURI, "Result should have DocumentNodes"),
  test.assertEqual("/recipes/PhillySpecial.json", actual[0].baseURI)
);

/**
 * Scenario: search for "B48 Triple Double" yeast.
 * There is one recipe that should match: W20.
 */
actual = rec.recipeByIngredient(null, null, "B48 Triple Double", null);

assertions.push(
  test.assertTrue(Array.isArray(actual), "Result is expected to be an Array"),
  test.assertEqual(1, actual.length, "Expected to find 1 yeast result"),
  test.assertExists(actual[0].baseURI, "Result should have DocumentNodes"),
  test.assertEqual("/recipes/W20.json", actual[0].baseURI)
);

/**
 * Scenario: search for "Irish moss" as an "other" ingredient.
 * There is one recipe that should match: Philly Special.
 */
actual = rec.recipeByIngredient(null, null, null, "Irish moss");

assertions.push(
  test.assertTrue(Array.isArray(actual), "Result is expected to be an Array"),
  test.assertEqual(1, actual.length, "Expected to find 1 Irish moss result"),
  test.assertExists(actual[0].baseURI, "Result should have DocumentNodes"),
  test.assertEqual("/recipes/PhillySpecial.json", actual[0].baseURI)
);

assertions;
