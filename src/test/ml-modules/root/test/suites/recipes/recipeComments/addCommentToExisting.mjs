declareUpdate();

const { addCommentToRecipe, getCommentsFromRecipe } = require("/lib/recipes.sjs");
const { runAsUpdate, runAsQuery } = require("/test/lib/common.sjs");
const test = require("/test/test-helper.xqy");
import { TEST_USER_WRITER } from "lib/suiteCommon.mjs";

const targetURI = "/recipes/W20.json";

runAsUpdate(() => addCommentToRecipe(targetURI, "ab1234", "comment 1", xs.dateTime("2023-01-01T00:00:00Z")));

let actual = fn.head(runAsQuery(() => getCommentsFromRecipe(targetURI), { "userId": xdmp.user(TEST_USER_WRITER) }));

let assertions = [
  test.assertTrue(Array.isArray(actual), "response should have been an Array"),
  test.assertEqual(1, actual.length, "Expected to get back 1 comment")
];

assertions;
