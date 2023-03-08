"use strict";

const test = require("/test/test-helper.xqy");
const { CREDENTIAL_NAME } = require("lib/suiteCommon.sjs");

/**
 * Using an input value that is not a number should cause a 400 response.
 */
const TARGET_CELSIUS = "abc";

let actual = xdmp.httpGet("http://%%mlHost%%:%%mlTestRestPort%%/v1/resources/temperature?rs:celsius=abc", {
  credentialId: xdmp.credentialId(CREDENTIAL_NAME)
});

let httpResponse = fn.head(actual);

let assertions = [test.assertEqual(400, httpResponse.code)];

assertions;
