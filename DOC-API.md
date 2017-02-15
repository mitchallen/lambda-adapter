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


* [lambda-adapter](#module_lambda-adapter)
    * [.package()](#module_lambda-adapter+package)
    * [.health()](#module_lambda-adapter+health)

<a name="module_lambda-adapter+package"></a>

### lambda-adapter.package()
Returns the package name

**Kind**: instance method of <code>[lambda-adapter](#module_lambda-adapter)</code>  
<a name="module_lambda-adapter+health"></a>

### lambda-adapter.health()
Health check

**Kind**: instance method of <code>[lambda-adapter](#module_lambda-adapter)</code>  
**Example** *(Usage Example)*  
```js
                var factory = require("@mitchallen/lambda-adapter");
             
                factory.create({})
                .then(function(obj) {
                    return obj.health();
                })
                .then(function(result) {
                    console.log("HEALTH: ", result);
                })
                .catch( function(err) { 
                    console.error(err); 
                });
```
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

**Example** *(Usage example)*  
```js
    var factory = require("@mitchallen/lambda-adapter");
 
    factory.create({})
    .then(function(obj) {
        return obj.health();
    })
    .catch( function(err) { 
        console.error(err); 
    });
```
