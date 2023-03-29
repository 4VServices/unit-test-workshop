"use strict";

const test = require("/test/test-helper.xqy");
const { CREDENTIAL_NAME } = require("lib/suiteCommon.sjs");

const TARGET_CELSIUS = 0;

let actual = xdmp.httpGet(
  `http://%%mlHost%%:%%mlTestRestPort%%/v1/resources/temperature?rs:celsius=${TARGET_CELSIUS}`,
  {
    credentialId: xdmp.credentialId(CREDENTIAL_NAME)
  }
);

let assertions = [test.assertEqual(2, fn.count(actual))];

let httpResponse = fn.head(actual);
let serviceResponse = fn.head(fn.subsequence(actual, 2, 1)).toObject();

assertions.push(
  test.assertEqual(200, httpResponse.code),
  test.assertExists(serviceResponse.fahrenheit, "Response should include 'fahrenheit' property"),
  test.assertEqual(32, serviceResponse.fahrenheit),
  test.assertExists(serviceResponse.celsius, "Response should include 'celsius' property"),
  test.assertEqual(TARGET_CELSIUS, serviceResponse.celsius)
);

assertions;
