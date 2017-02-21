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

    var _eventEmpty = {};

    var _eventFull = {
        "resource": "/{proxy+}",
        "path": "/my-test",
        "httpMethod": "GET",
        "queryStringParameters": {
            "jsonp": true,
            "alpha": "a",
            "beta": "b",
            "tokenType": "card",
            "token": "abc123"
        }
    };


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
            event: _eventEmpty,
            callback: _callback
        })
        .then(function(obj){
            should.exist(obj);
            should.exist(obj.params);
            should.exist(obj.response);
            should.exist(obj.response.json);
            should.exist(obj.response.jsonp);
            should.exist(obj.response.fail);
            done();
        })
        .catch( function(err) { 
            console.error(err); 
            done(err);  // to pass on err, remove err (done() - no arguments)
        });
    });

    it('create method with env should return object', done => {
        var key = "secret",
            value = "foo";
        _factory.create({
            env: {
                [key]: value
            },
            event: _eventEmpty,
            callback: _callback
        })
        .then(function(obj){
            should.exist(obj);
            should.exist(obj.env);
            should.exist(obj.env[key]);
            obj.env[key].should.eql(value);
            should.exist(obj.params);
            should.exist(obj.response);
            should.exist(obj.response.json);
            should.exist(obj.response.jsonp);
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
    });


    it('create method with event queryStringParameters and return object with parameters', done => {
        _factory.create({
            event: _eventFull,
            callback: _callback
        })
        .then(function(obj){
            should.exist(obj);
            should.exist(obj.params);
            should.exist(obj.params.alpha)
            obj.params.alpha.should.eql(_eventFull.queryStringParameters.alpha);
            done();
        })
        .catch( function(err) { 
            console.error(err); 
            done(err);  // to pass on err, remove err (done() - no arguments)
        });
    });


    it('create method with response json should succeed', done => {
        var message = { 
            body: "callback test"
        };
        var testCB = function(err,msg) {
            // console.log(msg);
            msg.should.eql(message);
            done()
        }
        _factory.create({
            event: _eventEmpty,
            callback: testCB
        })
        .then(function(obj){
            obj.response.json(message);
            // done();
        })
        .catch( function(err) { 
            console.error(err); 
            done(err);  // to pass on err, remove err (done() - no arguments)
        });
    });

    it('create method with response jsonp should succeed', done => {
        var message = { 
            body: "callback test"
        };
        var testCB = function(err,msg) {
            // console.log(msg);
            msg.should.eql(message);
            done()
        }
        _factory.create({
            event: _eventEmpty,
            callback: testCB
        })
        .then(function(obj){
            obj.response.jsonp(message);
            // done();
        })
        .catch( function(err) { 
            console.error(err); 
            done(err);  // to pass on err, remove err (done() - no arguments)
        });
    });

    it('create method with response fail should succeed', done => {
        var message = { 
            body: "callback test"
        };
        var testCB = function(err,msg) {
            // doesn't use err
            // console.log(msg);
            msg.should.eql(message);
            done()
        }
        _factory.create({
            event: _eventEmpty,
            callback: testCB
        })
        .then(function(obj){
            obj.response.fail(message);
            // done();
        })
        .catch( function(err) { 
            console.error(err); 
            done(err);  // to pass on err, remove err (done() - no arguments)
        });
    });
});
