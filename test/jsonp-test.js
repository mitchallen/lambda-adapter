/**
    Module: @mitchallen/stripe-testing
      Test: smoke-test
    Author: Mitch Allen
*/

/*jshint node: true */
/*jshint mocha: true */
/*jshint esversion: 6 */

"use strict";

var request = require('supertest'),
    should = require('should'),
    matrix = require('./matrix');

var testMatrix = matrix.create();

function boolReplacer(key, value) {
    // Filtering out properties
    if (typeof value === 'boolean') {
        // convert to string
        return value ? "true" : "false";
    }
    return value;
} 

describe(`JSONP request`, () => {

    var _nextYear = (new Date(new Date().setFullYear(new Date().getFullYear() + 1))).getFullYear(), 
    _token = null;

    var _email = `api-cloud-demo@mitchallen.com`;

    beforeEach( done => {
        done();
    });

    afterEach( done => {
        // Call after eeach test
        done();
    });

    // tests outside the matrix can go in core

    // describe(`core test`, () => {

    //     it('PUT CORE TEST HERE', done => {
    //         // .. 
    //         done();
    //     });

    // });

    // Test each service in a matrix

    testMatrix.forEach(function (el) {

        var framework = el.service;

        if(!el.testHost) {
            console.error("\n*** MISSING ***\n");
            console.error(`Need to define environment variable ${el.key}_HOST_ECHO for ${el.service}`);
            return;
        }

        describe(`${framework}`, () => {

            var serviceKey = el.key,
                testHost = el.testHost,
                testPath  = el.testPath;

            _email = `api.cloud.adapter@mitchallen.com`;

            before( done => {
                // Call before all tests

                // console.log(`HOST: ${testHost}, URL: ${testUrl}`);

                done();
            });

            after( done => {
                // Call after all tests
                done();
            });

            it('get request should succeed', done => {
                var queryObject = { 
                        "jsonp": true,
                        "cb": "callback",
                        "stripeToken": "abc123", 
                        "stripeTokenType": "card", 
                        "stripeEmail": _email 
                    };
                    var strObj = JSON.stringify(queryObject, boolReplacer );
                    // var strObj = JSON.stringify(expectedObject);
                    var expectedText = `/**/ typeof callback === \'function\' && callback(${strObj});`;
                // console.log(JSON.stringify(queryObject,null,2));
                request(testHost)
                    .get(testPath)
                    .query(queryObject)
                    // .set('Accept', 'application/json')
                    .expect('Content-Type', /javascript/)
                    .expect(200) 
                    .end(function (err, res) {
                        // console.log(res);
                        should.not.exist(err);
                        should.exist(res);
                        should.exist(res.text);
                        // can't compare whole text since order not guaranteed
                        // res.text.should.eql(expectedText);
                        res.text.should.containEql("/**/ typeof callback === \'function\' && callback(");
                        res.text.should.containEql('"jsonp":"true"');
                        res.text.should.containEql(`"cb":"${queryObject.cb}"`);
                        res.text.should.containEql(`"stripeToken":"${queryObject.stripeToken}"`);
                        res.text.should.containEql(`"stripeTokenType":"${queryObject.stripeTokenType}"`);
                        res.text.should.containEql(`"stripeEmail":"${queryObject.stripeEmail}"`);
                        // console.log(res.body);
                        done();
                    });
            });

            it('callback name get request should succeed', done => {
                var cbName = "foo",
                    queryObject = { 
                        "jsonp": true,
                        "cb": cbName,
                        "stripeToken": "abc123",  
                        "stripeTokenType": "card", 
                        "stripeEmail": _email 
                    };
                    var strObj = JSON.stringify(queryObject, boolReplacer );
                    var expectedText = `/**/ typeof ${cbName} === 'function' && ${cbName}(${strObj});`;
                // console.log(JSON.stringify(queryObject,null,2));
                request(testHost)
                    .get(testPath)
                    .query(queryObject)
                    // .set('Accept', 'application/json')
                    .expect('Content-Type', /javascript/)
                    .expect(200) 
                    .end(function (err, res) {
                        // console.log(res);
                        should.not.exist(err);
                        should.exist(res);
                        should.exist(res.text);
                        // console.log(res.text);
                        res.text.should.containEql(`/**/ typeof ${cbName} === 'function' && ${cbName}(`);
                        res.text.should.containEql('"jsonp":"true"');
                        res.text.should.containEql(`"cb":"${queryObject.cb}"`);
                        res.text.should.containEql(`"stripeToken":"${queryObject.stripeToken}"`);
                        res.text.should.containEql(`"stripeTokenType":"${queryObject.stripeTokenType}"`);
                        res.text.should.containEql(`"stripeEmail":"${queryObject.stripeEmail}"`);
                        // console.log(res.body);
                        done();
                    });
            });

        });
    });

});