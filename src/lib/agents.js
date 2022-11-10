// eslint-disable-next-line import/no-self-import
const { got_, request_, http2_ } = require('./agents/');

module.exports = {
  got: async (params, http2, method, logger) => got_(params, http2, method, logger),
  request: async (params, http2, method, logger) => request_(params, http2, method, logger),
  http2: async (params, http2, method, logger) => http2_(params, http2, method, logger),
};
