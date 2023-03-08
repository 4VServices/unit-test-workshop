"use strict";

const temp = require("/lib/temperature.sjs");

function get(context, params) {
  if (fn.exists(params.celsius)) {
    const celNum = Number.parseFloat(params.celsius);
    if (Number.isNaN(celNum)) {
      fn.error(null, "RESTAPI-SRVEXERR", Sequence.from([400, `"${params.celsius}" is not a numeric value`]));
    }
    return xdmp.toJSON({
      fahrenheit: temp.celsiusToFahrenheit(Number.parseFloat(celNum)),
      celsius: Number.parseFloat(celNum)
    });
  } else if (fn.exists(params.fahrenheit)) {
    const fahrNum = Number.parseFloat(params.fahrenheit);
    if (Number.isNaN(fahrNum)) {
      fn.error(null, "RESTAPI-SRVEXERR", Sequence.from([400, `"${params.fahrenheit}" is not a numeric value`]));
    }
    return xdmp.toJSON({
      celsius: temp.fahrenheitToCelsius(Number.parseFloat(fahrNum)),
      fahrenheit: Number.parseFloat(fahrNum)
    });
  }
}

function post(context, params, input) {
  // return zero or more document nodes
}

function put(context, params, input) {
  // return at most one document node
}

function deleteFunction(context, params) {
  // return at most one document node
}

exports.GET = get;
exports.POST = post;
exports.PUT = put;
exports.DELETE = deleteFunction;
