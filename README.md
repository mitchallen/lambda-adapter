@mitchallen/lambda-adapter
==
aws lambda service adapter
--

<p align="left">
  <a href="https://travis-ci.org/mitchallen/lambda-adapter">
    <img src="https://img.shields.io/travis/mitchallen/lambda-adapter.svg?style=flat-square" alt="Continuous Integration">
  </a>
  <a href="https://codecov.io/gh/mitchallen/lambda-adapter">
    <img src="https://codecov.io/gh/mitchallen/lambda-adapter/branch/master/graph/badge.svg" alt="Coverage Status">
  </a>
  <a href="https://npmjs.org/package/@mitchallen/lambda-adapter">
    <img src="http://img.shields.io/npm/dt/@mitchallen/lambda-adapter.svg?style=flat-square" alt="Downloads">
  </a>
  <a href="https://npmjs.org/package/@mitchallen/lambda-adapter">
    <img src="http://img.shields.io/npm/v/@mitchallen/lambda-adapter.svg?style=flat-square" alt="Version">
  </a>
  <a href="https://npmjs.com/package/@mitchallen/lambda-adapter">
    <img src="https://img.shields.io/github/license/mitchallen/lambda-adapter.svg" alt="License"></a>
  </a>
</p>

## Installation

    $ npm init
    $ npm install @mitchallen/lambda-adapter --save
  
* * *

## Modules

<dl>
<dt><a href="#module_lambda-adapter">lambda-adapter</a></dt>
<dd><p>Module</p>
</dd>
<dt><a href="#module_lambda-adapter-factory">lambda-adapter-factory</a></dt>
<dd><p>Factory module</p>
</dd>
</dl>

<a name="module_lambda-adapter"></a>

## lambda-adapter
Module

<a name="module_lambda-adapter-factory"></a>

## lambda-adapter-factory
Factory module

<a name="module_lambda-adapter-factory.create"></a>

### lambda-adapter-factory.create(spec) ⇒ <code>Promise</code>
Factory method 
It takes one spec parameter that must be an object with named parameters

**Kind**: static method of <code>[lambda-adapter-factory](#module_lambda-adapter-factory)</code>  
**Returns**: <code>Promise</code> - that resolves to {module:lambda-adapter}  

| Param | Type | Description |
| --- | --- | --- |
| spec | <code>Object</code> | Named parameters object |
| spec.env | <code>Object</code> | An object containing key values pairs of env variables |
| spec.regex | <code>Object</code> | Path regex, like '/:model/:id' |
| spec.event | <code>Object</code> | Event from Lambda handler |
| spec.callback | <code>function</code> | Callback from Lambda handler |

**Example** *(Using adapter)*  
```js

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
```
**Example** *(Passing adapter)*  
```js

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
```

* * *

## Testing

To test, go to the root folder and type (sans __$__):

    $ npm test
   
* * *
 
## Repo(s)

* [bitbucket.org/mitchallen/lambda-adapter.git](https://bitbucket.org/mitchallen/lambda-adapter.git)
* [github.com/mitchallen/lambda-adapter.git](https://github.com/mitchallen/lambda-adapter.git)

* * *

## Contributing

In lieu of a formal style guide, take care to maintain the existing coding style.
Add unit tests for any new or changed functionality. Lint and test your code.

* * *

## Version History

#### Version 0.3.0

* Expanded and reworked, breaking backward compatibility

#### Version 0.2.2

* Added __env__ parameter for passing environment parameters

#### Version 0.2.1

* fixed some stringify issue that affect API gatewat

#### Version 0.2.0

* Broke backward compatibility
* response.success replaced by response.json and response.jsonp

#### Version 0.1.3

* brought code coverage up to 100%

#### Version 0.1.2

* fixed type-o in code doc

#### Version 0.1.1

* updated description in package.json and README

#### Version 0.1.0 

* initial release

* * *
