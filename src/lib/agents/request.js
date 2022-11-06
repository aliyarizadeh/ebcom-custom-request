const request = require('request-promise-native');
const config = require('../../config');

module.exports = async (params, http2 /** Http2 not use in this agent */, method) => {
  // console.log(config.defaults);
  const options = {
    ...config.defaults,
    ...params,
    method,
  };
  delete options.agent;

  console.log(options);
  const response = await request(options);
  return response;
};
