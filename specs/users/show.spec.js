"use strict";

var
  assert = require("chai").assert,
  spec = require("api-first-spec"),
  config = require("../../config/config.json");

var API = spec.define({
  "endpoint": "/api/users/[id]",
  "method": "GET",
  "request": {
    "contentType": spec.ContentType.URLENCODED,
  },
  "response": {
    "contentType": spec.ContentType.JSON,
    "data": {
      "code": "int",
      "result": {
        "first_name": "string",
        "last_name": "string",
        "birthday": "date",
        "sex": "string",
        "created_at": "date"
      }
    },
    "rules": {
      "code": {
        "required": true
      },
      "result": function (data) {
        return data.code == 200;
      },
      "result.*": function(data) {
        return data.code == 200;
      }
    }
  }
});

describe("show", function () {
  var host = spec.host(config.host);

  it("invalid id", function (done) {
    host.api(API).params({
      "id": 99
    }).notFound(done);
  });

  it("success on valid id", function (done) {
    host.api(API).params({
      "id": 1
    }).success(function (data) {
      assert.equal(data.code, 200);
      assert.equal(data.result.first_name, "first_name1");
      assert.equal(data.result.last_name, "last_name1");
      assert.equal(data.result.birthday, "1991-04-17");
      assert.equal(data.result.sex, "F");
      assert.equal(data.result.created_at, "2016-01-10 12:10:12");
      done();
    });
  });
});

module.exports = API;