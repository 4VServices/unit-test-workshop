"use strict";

const test = require("/test/test-helper.xqy");
const rec = require("/lib/recipes.sjs");

let assertions = [];

/**
 * Scenario: search for a malt ingredient that doesn't exist.
 * Should not match any recipe.
 */
let actual = rec.recipeByIngredient("NO SUCH INGREDIENT", null, null, null);

assertions = [
  test.assertTrue(Array.isArray(actual), "Result is expected to be an Array"),
  test.assertEqual(0, actual.length)
];

/**
 * Scenario: search for a hop that doesn't exist.
 * Should not match any recipe.
 */
actual = rec.recipeByIngredient(null, "NO SUCH INGREDIENT", null, null);

assertions.push(
  test.assertTrue(Array.isArray(actual), "Result is expected to be an Array"),
  test.assertEqual(0, actual.length)
);

/**
 * Scenario: search for a yeast that doesn't exist.
 * Should not match any recipe.
 */
actual = rec.recipeByIngredient(null, null, "NO SUCH INGREDIENT", null);

assertions.push(
  test.assertTrue(Array.isArray(actual), "Result is expected to be an Array"),
  test.assertEqual(0, actual.length)
);

/**
 * Scenario: search for an other ingredient that doesn't exist.
 * Should not match any recipe.
 */
actual = rec.recipeByIngredient(null, null, null, "NO SUCH INGREDIENT");

assertions.push(
  test.assertTrue(Array.isArray(actual), "Result is expected to be an Array"),
  test.assertEqual(0, actual.length)
);

assertions;
