"use strict";

var
  assert = require("chai").assert,
  spec = require("api-first-spec"),
  config = require("../../config/config.json");

var API = spec.define({
  "endpoint": "/api/users/[id]",
  "method": "DELETE",
  "request": {
    "contentType": spec.ContentType.URLENCODED
  },
  "response": {
    "contentType": spec.ContentType.JSON,
    "data": {
      "code": "int"
    },
    "rules": {
      "code": {
        "required": true
      }
    }
  }
});

describe("delete user", function () {
  var host = spec.host(config.host);
  
  it("success", function (done) {
    host.api(API).params({
      "id": 99
    }).notFound(done);
  });

  it("success", function (done) {
    host.api(API).params({
      "id": 3
    }).success(function (data) {
      assert.equal(data.code, 200);
      done();
    });
  });
});

module.exports = API;