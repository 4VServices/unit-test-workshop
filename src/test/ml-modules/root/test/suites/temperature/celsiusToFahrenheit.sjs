"use strict";

const test = require("/test/test-helper.xqy");
const temp = require("/lib/temperature.sjs");

let assertions = [];

assertions.push(
  test.assertEqual(32, temp.celsiusToFahrenheit(0)),
  test.assertEqual(212, temp.celsiusToFahrenheit(100))
);

test.log("celsiusToFahrenheit COMPLETE....");
assertions;
