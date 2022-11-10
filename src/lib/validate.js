const agents = require('./agents');

module.exports = (params, http2, agent, logger) => {
  if (![true, false].includes(http2)) throw new Error('Http2 input is not valid!');
  if (!(agent in agents)) throw new Error('Agent not found');
  if ((http2 && !['got', 'http2'].includes(agent))) throw new Error('you can use http2 only with GOT and HTTP2 agents');
  if (logger && typeof logger !== 'function') throw new Error('Invalid logger service');
};
