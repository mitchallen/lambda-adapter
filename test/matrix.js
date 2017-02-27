"use strict";

module.exports.create = (spec) => {

    spec = spec || {};

    return [
        { 
            key: "AWS",
            service: "aws lambda",
            testHost: process.env.AWS_HOST_ECHO, 
            testPath: "/test/echo"  
        }
    ];
} 