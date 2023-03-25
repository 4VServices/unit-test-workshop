"use strict";

declareUpdate();

const test = require("/test/test-helper.xqy");

["HeatherMaibock", "PhillySpecial", "W20"].forEach((name) =>
  xdmp.documentInsert(`/recipes/${name}.json`, test.getTestFile(`recipe-${name}.json`), {
    "permissions": [xdmp.permission("test-workshop-reader", "read"), xdmp.permission("test-workshop-writer", "update")]
  })
);
