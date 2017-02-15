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

### lambda-adapter-factory.create(spec, event, callback) ⇒ <code>Promise</code>
Factory method 
It takes one spec parameter that must be an object with named parameters

**Kind**: static method of <code>[lambda-adapter-factory](#module_lambda-adapter-factory)</code>  
**Returns**: <code>Promise</code> - that resolves to {module:lambda-adapter}  

| Param | Type | Description |
| --- | --- | --- |
| spec | <code>Object</code> | Named parameters object |
| event | <code>Object</code> | Event from Lambda handler |
| callback | <code>function</code> | Callback from Lambda handler |

**Example** *(Using adapter)*  
```js

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
```
**Example** *(Passing adapter)*  
```js

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

#### Version 0.1.1

* updated description in package.json and README

#### Version 0.1.0 

* initial release

* * *
