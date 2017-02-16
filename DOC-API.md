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
            event: event, 
            callback: callback 
        })
        .then(function(adapter) {
            return otherFactory.create({ adapter: adapter });
        });
    };
```
