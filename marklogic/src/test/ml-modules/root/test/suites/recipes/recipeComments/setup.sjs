"use strict";

declareUpdate();

const test = require("/test/test-helper.xqy");

["HeatherMaibock", "PhillySpecial", "W20", "SomeBeer"].forEach((name) =>
  xdmp.documentInsert(`/recipes/${name}.json`, test.getTestFile(`recipe-${name}.json`))
);
