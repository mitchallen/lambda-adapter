/**
    Module: @mitchallen/path-parser
    Author: Mitch Allen
*/

/*jshint node: true */
/*jshint esversion: 6 */

"use strict";

const wrapper = require('path-to-regexp-wrap')();

module.exports.parse = (spec) => {

    spec = spec || {};

    var regex = spec.regex,
        path = spec.path;

    var params = {};

    if( regex && path ) {
        const match = wrapper(regex);
        params = match(path);
    }

    return params;
};