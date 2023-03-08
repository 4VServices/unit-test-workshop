"use strict";

declareUpdate();

const common = require("/test/lib/common.sjs");
const { CREDENTIAL_NAME } = require("lib/suiteCommon.sjs");

common.removeTestCredential(CREDENTIAL_NAME);
