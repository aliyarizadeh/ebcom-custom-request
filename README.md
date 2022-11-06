# ```@ebcom/custom-request``` is customized module for make http1.1 and http2, xml, http request from node js

this module use 3 module:

- GOT    ```version: 11```
- REQUEST PROMISE NATIVE  ```version: 1.0.8 ```

```custom-request``` suport all methods for make http request


      ---- GET, POST, PUT, PATCH, DELETE, HED ----


Examples for make request with `GOT` agent and options you can use with got agent:

```js
const cr = require('@ebcom/custom-request');
const options = {
      url: 'http://url.com',
      mehtod: 'POST',
      json: true,
      headers: {
            'Content-Type' : 'Application/json',
      },
      auth: {

      },
      query: {
            size: 10
      },
      timeout: 60 * 1000,
      retry: {},
      hooks: {},
      https: {},
      encoding: 'utf8',
      responseType: 'json',
      bodyOnly: true,
      throwErrors: false,
      context: {},
      body: {
            username: 'Ali'
      },
      form:{
            username: 'Ali',
      }
};

const http2 = false;
const agent = 'GOT'; // UpperCase or LowerCase

const response = await cr(options, http2, agent);
```
###  **url**: String path request.
### **method**: Support all http method (GET, POST, PUT, PATCH, DELETE, HEAD). type string
### **headers**: You cat set headers with this felid. type object
### **auth**: Can pass Basic authorization and bearer authorization 

```
auth: {
  user: 'username',
  pass: 'password',
}

or

auth:{
  username: 'username'
  password: 'password'
}

or

auth: {
  bearer: 'bearer token'
}

auth: {
  bearer: 'token'
}
```
### **query**: You can set querystring with this felid. type object
### **timeout**: Set timeout *default* is one minute. type number
### **throwErrors**: (Boolean type) Throw HTTP errors, default is false
### **bodyOnly** if you want get only the body should be this option true, default is false 
### **retry**: [View github page for more info](https://github.com/sindresorhus/got/blob/main/documentation/7-retry.md)
### **hooks**: [View github page for more info](https://github.com/sindresorhus/got/blob/main/documentation/9-hooks.md)
### **https**: [View github page for more info](https://github.com/sindresorhus/got/blob/main/documentation/5-https.md)
### **encoding**: You can set encoding type, *default* is 'utf8'.
### **responseType**: You can set response type with 'json' or 'text', *default* is 'json'.
### **context**: type object.
### **body**: Set request body, type object.
### **form**: Set request form. if set, the content-type header defaults to application/x-www-form-urlencoded.

----------------------------------------------------------------

Examples for make request with `REQUEST` agent:

```js
const cr = require('custom-request');
const options = {
      url: 'http://url.com',
      mehtod: 'POST', // Can call function methos (GET, POST, PUT,...) or set in request options
      headers: {
            'Content-Type' : 'Application/json',
      },
      query: {
            size: 10
      },
      timeout: 60 * 1000,
      retry: {},
      hooks: {},
      https: {},
      encoding: 'utf8',
      responseType: 'json',
      resolveBodyOnly: true,
      context: {},
      body: {
            username: 'Ali'
      },
};

const agent = 'REQUEST'; // UpperCase or LowerCase

const response = await cr(options, http2, agent);
```

## notice: You can't use http2 with `REQUEST` agent.

----------------------------------------------------------------
### Use ```defaults``` method:

### default method can set default some params like ``` timeout, proxy``` and other...

### Example:
```js
const customRequest = require('custom-request');
const req = customRequest.default({agent: 'REQUEST', timeout: 3 * 1000, proxy: 'YOUR PROXY URL....'})
```
- agent: You can initial object with default agent {'REQUEST', 'GOT'}.
if you don't choose agent by default is 'GOT'
