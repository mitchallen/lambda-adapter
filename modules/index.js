/**
    Module: @mitchallen/lambda-adapter
    Author: Mitch Allen
*/

/*jshint node: true */
/*jshint esversion: 6 */

"use strict";

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
 * @param {Object} event Event from Lambda handler
 * @param {function} callback Callback from Lambda handler
 * @returns {Promise} that resolves to {module:lambda-adapter}
 * @example <caption>Using adapter</caption>

    // lambda function

    var factory = require("@mitchallen/lambda-adapter"),
 
    exports.handler = function(event, context, callback) {

        factory.create({ 
            event: event, 
            callback: callback 
        })
        .then(function(adapter) {
            var params = adapter.params;
            response = adapter.response;
            var a = params.a,
                b = params.b;
            // ...
            if(bad-condition) {
                response.fail(err);
            } else {
                esponse.success(object);
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
        var event = spec.event,
            callback = spec.callback,
            _params = {};

        if(!event) {
            reject(new Error("create requires event"));
        }

        if(!callback) {
            reject(new Error("create requires callback"));
        }

        // TODO - create POST version
        if(event.queryStringParameters) {
            _params = event.queryStringParameters;
        }

        resolve({
            params: _params,
            response: {
                success: function(object) {
                    callback(null, object);
                },
                fail: function(err) {
                    // callback(err);
                    callback(null,err);
                }
            }
        });
    });
};
