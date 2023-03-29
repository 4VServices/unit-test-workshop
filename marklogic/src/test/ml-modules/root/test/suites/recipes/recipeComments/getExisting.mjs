const { getCommentsFromRecipe } = require("/lib/recipes.sjs");
const test = require("/test/test-helper.xqy");

const targetURI = "/recipes/SomeBeer.json";

let actual = getCommentsFromRecipe(targetURI);

let assertions = [
  test.assertTrue(Array.isArray(actual), "response should be an array"),
  test.assertEqual(2, actual.length, "there should be 2 comments")
];

actual.forEach((comment) =>
  assertions.push(
    test.assertExists(comment.commentBy, "expected to find commentBy property"),
    test.assertExists(comment.commentText, "expected to find commentText property"),
    test.assertExists(comment.commentAt, "expected to find commentAt property")
  )
);

assertions;
