/**
    Module: @mitchallen/del-test
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

describe(`del request`, () => {

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
                testPath  = el.testPath,
                _expressServer = null;

            _email = `api.cloud.adapter@mitchallen.com`;

            before( done => {
                // Call before all tests

                // console.log(`HOST: ${testHost}, URL: ${testUrl}`);

                if( serviceKey === 'EXP' ) {
                    _expressServer = expressModule.listen( { port: expressPort } );
                }
                done();
            });

            after( done => {
                // Call after all tests
                if(_expressServer) {
                    _expressServer.close();
                }
                done();
            });

            it('should echo back query values', done => {
                var queryObject = { 
                        "alpha": "abc123", 
                        "beta": "def456", 
                        "email": _email,
                        "boolTest": true
                    };
                // console.log(JSON.stringify(queryObject,null,2));
                request(testHost)
                    .del(testPath)
                    .query(queryObject)
                    .set('Content-Type', 'application/json')
                    .set('Accept', 'application/json')
                    .expect('Content-Type', /json/)
                    .expect(200)  
                    .end(function (err, res) {
                        should.not.exist(err);
                        should.exist(res);
                        should.exist(res.body);
                        // console.log(res.body);
                        res.body.query.alpha.should.eql(queryObject.alpha);
                        res.body.query.beta.should.eql(queryObject.beta);
                        res.body.query.email.should.eql(queryObject.email);
                        res.body.query.boolTest.should.eql(JSON.stringify(queryObject.boolTest));
                        done();
                    });
            });

            it('with params should echo back param values', done => {
                var params = { 
                        "model": "abc", 
                        "id": "123"
                    };

                var testUrl = `${testPath}/${params.model}/${params.id}`;

                // console.log(JSON.stringify(queryObject,null,2));
                request(testHost)
                    .del(testUrl)
                    // .query(queryObject)
                    .set('Content-Type', 'application/json')
                    .set('Accept', 'application/json')
                    .expect('Content-Type', /json/)
                    .expect(200)  
                    .end(function (err, res) {
                        should.not.exist(err);
                        should.exist(res);
                        should.exist(res.body);
                        // console.log(res.body);
                        // if(res.body.event) {
                        //     console.log(JSON.stringify(res.body.event,null,2));
                        // }
                        res.body.params.model.should.eql(params.model);
                        res.body.params.id.should.eql(params.id);
                        done();
                    });
            });
        });
    });

});