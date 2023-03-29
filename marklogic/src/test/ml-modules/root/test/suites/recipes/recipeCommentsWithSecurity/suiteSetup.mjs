import { TEST_USER_READER, TEST_USER_WRITER } from "lib/suiteCommon.mjs";
const { createTestUser } = require("/test/lib/common.sjs");

createTestUser(TEST_USER_READER, ["test-workshop-reader"]);
createTestUser(TEST_USER_WRITER, ["test-workshop-writer"]);
