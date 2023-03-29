declareUpdate();

const { addCommentToRecipe, getCommentsFromRecipe } = require("/lib/recipes.sjs");
const { runAsUpdate } = require("/test/lib/common.sjs");
const test = require("/test/test-helper.xqy");
import { TEST_USER_READER } from "lib/suiteCommon.mjs";

const targetURI = "/recipes/W20.json";

let assertions = [];

try {
  runAsUpdate(() => addCommentToRecipe(targetURI, "ab1234", "comment 1", xs.dateTime("2023-01-01T00:00:00Z")), {
    "userId": xdmp.user(TEST_USER_READER)
  });
  test.fail("This user should not have permission to add a comment");
} catch (ex) {
  if (ex.name === "SEC-PERMDENIED") {
    assertions.push(test.success);
  }
}

assertions;
