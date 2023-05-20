"use strict";

const test = require("/test/test-helper.xqy");
const temp = require("/lib/temperature.sjs");

let assertions = [];

let fraction = temp.fahrenheitToCelsius(20);

assertions.push(
  test.assertEqual(0, temp.fahrenheitToCelsius(32), "32 Fahrenheit should be 0 Celsius"),
  test.assertEqual(100, temp.fahrenheitToCelsius(212), "212 Fahrenheit should be 100 Celsius"),
  test.assertEqual(25, temp.fahrenheitToCelsius(77), "77 Fahrenheit should be 25 Celsius"),
  test.assertEqual(-1, temp.fahrenheitToCelsius(30.2), "30.2 Fahrenheit should be -1 Celsius"),
  test.assertMeetsMinimumThreshold(-6.67, fraction, "20 Fahrenheit should be at least -6.66 Celsius"),
  test.assertMeetsMaximumThreshold(-6.66, fraction, "20 Fahrenheit should not exceed -6.67 Celsius")
);

assertions;
