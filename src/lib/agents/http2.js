const http2 = require('http2');

module.exports = async (params, method) => {
  let response = '';

  const options = {
    ':method': method,
    ':path': params.path ? params.path.concat(params.query ? `/?${params.query}` : '') : '/',
    ...params.headers,
  };

  const client = http2.connect(params.url);

  client.on('error', (err) => { console.log(err); });

  const req = client.request(options);

  req.setEncoding(params.encoding);
  if (params.body && Object.keys(params.body).length > 0) req.write(JSON.stringify(params.body));
  if (params.form && Object.keys(params.form).length > 0) req.write(JSON.stringify(params.form));

  response = new Promise((resolve, reject) => {
    let data = '';

    req.on('data', async (chunk) => {
      data += chunk;
      resolve(JSON.parse(data));
      // eslint-disable-next-line prefer-promise-reject-errors
      reject(() => {
        throw new Error('Response error');
      });
    });
  });

  return response;
};
