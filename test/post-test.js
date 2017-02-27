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

describe(`post request`, () => {

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

            it('should echo back post body values', done => {
                var postObject = { 
                        "alpha": "abc123", 
                        "beta": "def456", 
                        "email": _email,
                        "boolTest": true
                    };
                // console.log(JSON.stringify(postObject,null,2));
                request(testHost)
                    .post(testPath)
                    .send(postObject)
                    .set('Content-Type', 'application/json')
                    .set('Accept', 'application/json')
                    .expect('Content-Type', /json/)
                    .expect(200)  
                    .end(function (err, res) {
                        // console.log("*** ERR ***");
                        // console.log(err);
                        // console.log(err);
                        should.not.exist(err);
                        should.exist(res);
                        should.exist(res.body);
                        res.body.body.alpha.should.eql(postObject.alpha);
                        res.body.body.beta.should.eql(postObject.beta);
                        res.body.body.email.should.eql(postObject.email);
                        res.body.body.boolTest.should.eql(postObject.boolTest);
                        done();
                    });
            });

            it('with query should echo back query and post body values', done => {
                var queryObject = {
                    "q1": 100,
                    "q2": "xyz789"
                };
                var postObject = { 
                    "alpha": "abc123", 
                    "beta": "def456", 
                    "email": _email,
                    "boolTest": true
                };
                // console.log(JSON.stringify(postObject,null,2));
                request(testHost)
                    .post(testPath)
                    .query(queryObject)
                    .send(postObject)
                    .set('Content-Type', 'application/json')
                    .set('Accept', 'application/json')
                    .expect('Content-Type', /json/)
                    .expect(200)  
                    .end(function (err, res) {
                        // console.log("*** ERR ***");
                        // console.log(err);
                        should.not.exist(err);
                        should.exist(res);
                        should.exist(res.body);
                        res.body.body.alpha.should.eql(postObject.alpha);
                        res.body.body.beta.should.eql(postObject.beta);
                        res.body.body.email.should.eql(postObject.email);
                        res.body.body.boolTest.should.eql(postObject.boolTest);
                        res.body.query.q1.should.eql(JSON.stringify(queryObject.q1));
                        res.body.query.q2.should.eql(queryObject.q2);
                        done();
                    });
            });
        });
    });

});