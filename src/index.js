const config = require('./config');
const { agents, validation } = require('./lib');

const methods = {
  get: async (params, http2 = config.http2.default, agent = config.agents.default, logger = undefined) => {
    validation(params, http2, agent.toLowerCase(), logger);
    const response = await agents[agent.toLowerCase()](params, http2, 'GET');
    return response;
  },

  post: async (params, http2 = config.http2.default, agent = config.agents.default, logger = undefined) => {
    validation(params, http2, agent.toLowerCase(), logger);
    const response = await agents[agent.toLowerCase()](params, http2, 'POST', logger);
    return response;
  },

  put: async (params, http2 = config.http2.default, agent = config.agents.default, logger = undefined) => {
    validation(params, http2, agent.toLowerCase(), logger);
    const response = await agents[agent.toLowerCase()](params, http2, 'PUT', logger);
    return response;
  },

  patch: async (params, http2 = config.http2.default, agent = config.agents.default, logger = undefined) => {
    validation(params, http2, agent.toLowerCase(), logger);
    const response = await agents[agent.toLowerCase()](params, http2, 'PATCH', logger);
    return response;
  },

  head: async (params, http2 = config.http2.default, agent = config.agents.default, logger = undefined) => {
    validation(params, http2, agent.toLowerCase(), logger);
    const response = await agents[agent.toLowerCase()](params, http2, 'HEAD', logger);
    return response;
  },

  delete: async (params, http2 = config.http2.default, agent = config.agents.default, logger = undefined) => {
    validation(params, http2, agent.toLowerCase(), logger);
    const response = await agents[agent.toLowerCase()](params, http2, 'DELETE', logger);
    return response;
  },

};

const defaults = (params) => {
  if (params.agent) config.agents.default = params.agent;
  if (params.http2) config.http2.default = params.http2;
  config.defaults = params;
  return methods;
};

module.exports = { ...methods, defaults };
