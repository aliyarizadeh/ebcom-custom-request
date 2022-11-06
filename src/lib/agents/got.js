const got = require('got');
const { HttpProxyAgent, HttpsProxyAgent } = require('hpagent');
const config = require('../../config');
const ProviderError = require('../../error/ProviderError');

const authorization = (auth) => {
  let headers = {};
  const obj = Object.keys(auth);

  if (obj.includes('username') && obj.includes('password')) {
    headers = {
      'user-agent': 'Custom-Request EBCOM',
      Authorization: `Basic ${Buffer.from(`${auth.username}:${auth.password}`).toString('base64')}`,
    };
  } else if (obj.includes('user') && obj.includes('pass')) {
    headers = {
      'user-agent': 'Custom-Request EBCOM',
      Authorization: `Basic ${Buffer.from(`${auth.user}:${auth.pass}`).toString('base64')}`,
    };
  } else if (obj.includes('bearer') && typeof auth.bearer === 'string') {

    let [, token] = auth.bearer.split(' ');
    headers = {
      'user-agent': 'Custom-Request EBCOM',
      Authorization: token ? auth.bearer : `Bearer ${auth.bearer}`,
    };
  } else throw new Error(`Authorization felids is not valid \n ${JSON.stringify(auth)}`);

  return headers;
};

// Set proxy with agent
const setHttpAgent = (proxy) => ({
  http: new HttpProxyAgent({
    keepAlive: true,
    keepAliveMsecs: 1000,
    maxSockets: 256,
    maxFreeSockets: 256,
    scheduling: 'lifo',
    proxy,
  }),
});

const setHttpsAgent = (proxy) => ({
  https: new HttpsProxyAgent({
    keepAlive: true,
    keepAliveMsecs: 1000,
    maxSockets: 256,
    maxFreeSockets: 256,
    scheduling: 'lifo',
    proxy,
  }),
});

module.exports = async (params, http2, method) => {
  let response;

  const options = {
    url: params.url,
    method,
    allowGetBody: !!params.body,
    searchParams: params.query || undefined,
    headers: params.headers || {},
    agent: {},
    throwHttpErrors: false,
    resolveBodyOnly: params.bodyOnly ?? false,
    https: params.https || undefined,
    json: params.body && typeof params.body === 'object' ? params.body : undefined,
    form: params.form && typeof params.form === 'object' ? params.form : undefined,
    body: params.body && typeof params.body === 'string' ? params.body : undefined,
    timeout: params.timeout || config.defaults.timeout || 60 * 1000,
    retry: params.retry || undefined,
    hooks: params.hooks || undefined,
    encoding: params.encoding || undefined,
    responseType: params.json === true ? 'json' : 'text',
    context: params.context || undefined,
    http2,
  };

  if (params.auth) Object.assign(options.headers, authorization(params.auth));
  if (params.proxy) {
    const { protocol } = new URL(params.url);

    if (protocol === 'http:') Object.assign(options.agent, setHttpAgent(params.proxy || config.defaults.proxy));
    if (protocol === 'https:') Object.assign(options.agent, setHttpsAgent(params.proxy || config.defaults.proxy));
  }

  try {
    response = await got(options);

    if (params.throwErrors) {
      if (options.resolveBodyOnly) {
        if (response.code && response.message) throw new ProviderError(response.code, response.message);
        return response;
      } else {
        if (response?.body?.code && response?.body?.message) throw new ProviderError(response.body.code, response.body.message);
        return response;
      }
    } else return response;

  } catch (e) {
    if (['ETIMEDOUT', 'ECONNRESET', 'ESOCKETTIMEDOUT'].includes(e.code)) Object.assign(e, { error: { code: e.code } });
    throw e;
  }
};
