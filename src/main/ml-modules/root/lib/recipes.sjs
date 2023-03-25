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
 * Find recipes based on the specified combination of ingredients.
 * @param malt String or Array of Strings indicating the names of malt ingredients
 * @param hop String or Array of Strings indicating the variety of hops
 * @param yeast String or Array of Strings indicating the strand of yeast
 * @param other String or Array of Strings indicating the name of a non malt/hop/yeast ingredient
 * @return an Array of DocumentNodes with recipes
 */
function recipeByIngredient(malt, hop, yeast, other) {
  let queries = [];
  if (malt) {
    queries.push(
      cts.jsonPropertyScopeQuery(
        "fermentable",
        Array.isArray(malt)
          ? cts.andQuery(malt.map((curr) => cts.jsonPropertyValueQuery("name", curr)))
          : cts.jsonPropertyValueQuery("name", malt)
      )
    );
  }
  if (hop) {
    queries.push(
      cts.jsonPropertyScopeQuery(
        "hop",
        Array.isArray(hop)
          ? cts.andQuery(hop.map((curr) => cts.jsonPropertyValueQuery("variety", curr)))
          : cts.jsonPropertyValueQuery("variety", hop)
      )
    );
  }
  if (yeast) {
    queries.push(
      cts.jsonPropertyScopeQuery(
        "yeast",
        Array.isArray(yeast)
          ? cts.andQuery(yeast.map((curr) => cts.jsonPropertyValueQuery("strand", curr)))
          : cts.jsonPropertyValueQuery("strand", yeast)
      )
    );
  }
  if (other) {
    queries.push(
      cts.jsonPropertyScopeQuery(
        "miscellaneousAdditions",
        Array.isArray(other)
          ? cts.andQuery(other.map((curr) => cts.jsonPropertyValueQuery("name", curr)))
          : cts.jsonPropertyValueQuery("name", other)
      )
    );
  }
  return cts.search(cts.andQuery(queries), "unfiltered").toArray();
}

/**
 * Add a comment to a recipe.
 * @param recipeURI The URI of the recipe document.
 * @param commenter The username of the person leaving the comment.
 * @param comment String. The text of the comment.
 * @param timestamp xs.dateTime
 */
function addCommentToRecipe(recipeURI, commenter, comment, timestamp) {
  xdmp.nodeInsertChild(cts.doc(recipeURI).xpath('/envelope/headers/array-node("comments")'), {
    "comment": { "commentBy": commenter, "commentText": comment, "commentAt": timestamp }
  });
}

/**
 * Get all the comments attached to a recipe.
 * @param recipeURI The URI of the recipe document.
 * @return Array of comment objects, each with properties: 'commentBy', 'commentText', 'commentAt'.
 */
function getCommentsFromRecipe(recipeURI) {
  let doc = cts.doc(recipeURI);
  if (doc) {
    let commentsArray = doc.xpath("/envelope/headers/comments");
    if (commentsArray) {
      return commentsArray.toObject().map((curr) => curr.comment);
    }
  }
  return [];
}

module.exports = { addCommentToRecipe, getCommentsFromRecipe, calculateWaterRequirements, recipeByIngredient };
