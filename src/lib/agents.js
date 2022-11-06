// eslint-disable-next-line import/no-self-import
const { got_, request_, http2_ } = require('./agents/');

module.exports = {
  got: async (params, http2, method) => got_(params, http2, method),
  request: async (params, http2, method) => request_(params, http2, method),
  http2: async (params, http2, method) => http2_(params, http2, method),
};
