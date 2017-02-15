/**
    Module: @mitchallen/lambda-adapter
      Test: smoke-test
    Author: Mitch Allen
*/

/*jshint node: true */
/*jshint mocha: true */
/*jshint esversion: 6 */

"use strict";

var request = require('supertest'),
    should = require('should'),
    modulePath = "../modules/index";

describe('module factory smoke test', () => {

    var _factory = null;

    var _event = {};
    var _callback = function(err,message) {
        // ...
    }

    before( done => {
        // Call before all tests
        delete require.cache[require.resolve(modulePath)];
        _factory = require(modulePath);
        done();
    });

    after( done => {
        // Call after all tests
        done();
    });

    beforeEach( done => {
        // Call before each test
        done();
    });

    afterEach( done => {
        // Call after eeach test
        done();
    });

    it('module should exist', done => {
        should.exist(_factory);
        done();
    });

    it('create method with event and callback should return object', done => {
        _factory.create({
            event: _event,
            callback: _callback
        })
        .then(function(obj){
            should.exist(obj);
            should.exist(obj.params);
            should.exist(obj.response);
            should.exist(obj.response.success);
            should.exist(obj.response.fail);
            done();
        })
        .catch( function(err) { 
            console.error(err); 
            done(err);  // to pass on err, remove err (done() - no arguments)
        });
    });

    it('create method with no spec should return error', done => {
        _factory.create()
        .then(function(obj){
            should.exist(obj);
            done();
        })
        .catch( function(err) { 
            // console.error(err); 
            done();  // to pass on err, remove err (done() - no arguments)
        });
    });;
});
