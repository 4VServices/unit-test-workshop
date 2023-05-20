"use strict";

const test = require("/test/test-helper.xqy");
const temp = require("/lib/temperature.sjs");

let assertions = [];

assertions.push(
  test.assertEqual(32, temp.celsiusToFahrenheit(0), "0 Celsius should be 32 Fahrenheit"),
  test.assertEqual(212, temp.celsiusToFahrenheit(100), "100 Celsius should be 212 Fahrenheit"),
  test.assertEqual(77, temp.celsiusToFahrenheit(25), "25 Celsius should be 77 Fahrenheit"),
  test.assertEqual(30.2, temp.celsiusToFahrenheit(-1), "-1 Celsius should be 30.2 Fahrenheit")
);

assertions;
