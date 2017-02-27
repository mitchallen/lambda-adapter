/**
    Module: @mitchallen/lambda-adapter
    Author: Mitch Allen
*/

/*jshint node: true */
/*jshint esversion: 6 */

"use strict";

var pathParser = require('./path-parser');

/**
 * Module
 * @module lambda-adapter
 */

/**
 * 
 * Factory module
 * @module lambda-adapter-factory
 */

 /** 
 * Factory method 
 * It takes one spec parameter that must be an object with named parameters
 * @param {Object} spec Named parameters object
 * @param {Object} spec.env An object containing key values pairs of env variables
 * @param {Object} spec.regex Path regex, like '/:model/:id'
 * @param {Object} spec.event Event from Lambda handler
 * @param {function} spec.callback Callback from Lambda handler
 * @returns {Promise} that resolves to {module:lambda-adapter}
 * @example <caption>Using adapter</caption>

    // lambda function

    var factory = require("@mitchallen/lambda-adapter"),
 
    exports.handler = function(event, context, callback) {

        factory.create({ 
            env: {
                "stripeKey": process.env.TEST_STRIPE_SECRET || null
            },
            event: event, 
            callback: callback 
        })
        .then(function(adapter) {
            var env = adapter.env;
            var params = adapter.params;
            response = adapter.response;
            var stripeKey = env["stripeKey"];
            var a = params.a,
                b = params.b;
            // ...
            if(bad-condition) {
                response.fail(err);
            } else {
                response.json(object);
            }
        })
        .catch( function(err) { 
            console.error(err); 
        });
    };
 *
 * @example <caption>Passing adapter</caption>

    // lambda function

    var factory = require("@mitchallen/lambda-adapter"),
        otherFactory = require(...);
 
    exports.handler = function(event, context, callback) {

        factory.create({ 
            env: {
                "stripeKey": process.env.TEST_STRIPE_SECRET || null
            },
            event: event, 
            callback: callback 
        })
        .then(function(adapter) {
            return otherFactory.create({ adapter: adapter });
        });
    };
 */
module.exports.create = (spec) => {

    return new Promise((resolve, reject) => {

        spec = spec || {};
        var _env = spec.env,
            _regex = spec.regex,  // like '/:model/:id'
            event = spec.event,
            callback = spec.callback;

        if(!event) {
            reject(new Error("create requires event"));
        }

        if(!callback) {
            reject(new Error("create requires callback"));
        }

        var _params = pathParser.parse({ 
            path: event.path,
            regex: _regex 
        });

        resolve({
            params: _params,
            env: _env,
            method: event.httpMethod,
            query: event.queryStringParameters || {},
            body: JSON.parse(event.body) || {},
            response: {
                jsonp: function(res) {

                    // TODO - demand res.body

                    var cb = null;

                    if(res.headers) {
                        cb = res.headers["x-callback"];
                    }

                    // Stringify for API Gateway?
                    res.body = JSON.stringify(res.body);

                    if(cb) {
                        // res.body = JSON.stringify(res.body);
                        res.body = `/**/ typeof ${cb} === 'function' && ${cb}(${res.body});`;
                        res.headers["Content-Type"] = "text/javascript";
                    }

                    // AWS API Gateway will convert to res.body to res.text (based on header?)
                    // res.text = successJSON;

                    // callback(null, JSON.stringify(res));
                    callback(null, res);
                },
                json: function(res) {

                    // TEMP: for debugging
                    // res.body.event = event;

                    res.body = JSON.stringify(res.body);
                    // callback(null, JSON.stringify(res));

                    callback(null, res);
                },
                fail: function(err) {
                    // callback(err);
                    err.body = JSON.stringify(err.body);
                    // callback(null, JSON.stringify(err));
                    callback(null, err);
                }
            }
        });
    });
};