"use strict";

/**
 * Calculate the amount of water needed to produce the specified amount of wort.
 * @param recipe a JSON DocumentNode holding the recipe
 * @return a object indicating how much water will be lost to various factors, how much water to start with, and the
 * resulting amount for the fermentor.
 * Assumptions:
 * - Absorption loss of 0.125 gallons per pound of grain.
 * - Absorption loss of 0.0365 gallons per ounce of hops.
 * - Boil-off rate of 0.5 gallons per hour of boil.
 * - Trub loss of 0.5 gallons for a 5-gallon batch.
 */
function calculateWaterRequirements(recipe) {}

/**
 *
 * @param malt String or Array of Strings indicating the names of malt ingredients
 * @param hop String or Array of Strings indicating the variety of hops
 * @param yeast String or Array of Strings indicating the strand of yeast
 * @param other String or Array of Strings indicating the name of a non malt/hop/yeast ingredient
 * @return an Array of DocumentNodes with recipes
 */
function recipeByIngredient(malt, hop, yeast, other) {}

module.exports = { calculateWaterRequirements, recipeByIngredient };
