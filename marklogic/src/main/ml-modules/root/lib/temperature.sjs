"use strict";

/**
 * Convert a Celsius temperature to Fahrenheit.
 * @param celsius a Number representing a temperature in Celsius.
 */
function celsiusToFahrenheit(celsius) {
  // ˚F = (˚C * 9/5) + 32
  return (celsius * 9) / 5 + 32;
}

/**
 * Convert a Fahrenheit temperature to Celsius.
 * @param fahrenheit a Number representing a temperature in Fahrenheit.
 */
function fahrenheitToCelsius(fahrenheit) {
  // ˚C = (˚F - 32 ) * 5/9
  return ((fahrenheit - 32) * 5) / 9;
}

module.exports = {
  celsiusToFahrenheit,
  fahrenheitToCelsius
};
