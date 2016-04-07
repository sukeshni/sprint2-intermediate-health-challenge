"use strict";

var
  assert = require("chai").assert,
  spec = require("api-first-spec"),
  config = require("../../config/config.json");

var API = spec.define({
  "endpoint": "/api/users",
  "method": "POST",
  "request": {
    "contentType": spec.ContentType.URLENCODED,
    "params": {
      "first_name": "string",
      "last_name": "string",
      "email": "string",
      "birthday": "date",
      "height": "int",
      "weight": "int",
      "sex": "string",
      "contact_number": "int",
      "address": "string",
      "healthCardId": "string"
    },
    "rules": {
      "first_name": {
        "required": true
      },
      "last_name": {
        "required": true
      },
      "email": {
        "required": true
      },
      "birthday": {
        "required": true,
        "format": "YYYY-MM-DD"
      },
      "height": {
        "required": false
      },
      "weight": {
        "required": false
      },
      "sex": {
        "required": true
      },
      "contact_number": {
        "required": true
      },
      "address": {
        "required": true
      }     
    }
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

describe("create", function () {
  var host = spec.host(config.host);

  it("user already present", function (done) {
    host.api(API).params({
      "first_name": "first_name1",
      "last_name": "last_name1",
      "email": "user1@test.com",
      "birthday": "1991-04-17",
      "sex": "F",
      "contact_number": 09999999999,
      "address": "addr1"
    }).badRequest(done);
  });

  it("success", function (done) {
    host.api(API).params({
      "first_name": "testFirstName1",
      "last_name": "testLastName1",
      "email": "test1@test.com",
      "birthday": "1995-04-17",
      "sex": "F",
      "contact_number": 08888888888,
      "address": "Moon",
    }).success(function (data) {
      assert.equal(data.code, 200);
      done();
    });
  });

});

module.exports = API;