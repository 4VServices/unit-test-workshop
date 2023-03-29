import { TEST_USER_READER, TEST_USER_WRITER } from "lib/suiteCommon.mjs";
const { removeTestUser } = require("/test/lib/common.sjs");

removeTestUser(TEST_USER_READER);
removeTestUser(TEST_USER_WRITER);
