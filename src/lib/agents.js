// eslint-disable-next-line import/no-self-import
const { got_, request_, http2_ } = require('./agents/');

module.exports = {
  got: async (params, method) => got_(params, method),
  request: async (params, method, logger) => request_(params, method, logger),
  http2: async (params, method, logger) => http2_(params, method, logger),
};
