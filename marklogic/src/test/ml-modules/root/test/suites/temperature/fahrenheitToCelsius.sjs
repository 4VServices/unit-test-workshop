"use strict";

const test = require("/test/test-helper.xqy");
const temp = require("/lib/temperature.sjs");

let assertions = [];

assertions.push(
  test.assertEqual(0, temp.fahrenheitToCelsius(32)),
  test.assertEqual(100, temp.fahrenheitToCelsius(212))
);

assertions;
