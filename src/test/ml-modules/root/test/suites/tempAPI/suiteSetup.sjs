"use strict";

declareUpdate();

const common = require("/test/lib/common.sjs");
const { CREDENTIAL_NAME } = require("lib/suiteCommon.sjs");

common.createTestCredential(
  CREDENTIAL_NAME,
  ["test-workshop-reader"],
  "/v1/resources/temperature.*",
  "%%mlTestRestPort%%"
);
