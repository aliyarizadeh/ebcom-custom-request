const config = require('./config');
const { agents, validation } = require('./lib');

const methods = {
  get: async (params, agent = config.agents.default) => {
    validation(params, agent.toLowerCase(), params.logger);
    const response = await agents[agent.toLowerCase()](params, 'GET', params.logger);
    return response;
  },

  post: async (params, agent = config.agents.default) => {
    validation(params, agent.toLowerCase(), params.logger);
    const response = await agents[agent.toLowerCase()](params, 'POST', params.logger);
    return response;
  },

  put: async (params, agent = config.agents.default) => {
    validation(params, agent.toLowerCase(), params.logger);
    const response = await agents[agent.toLowerCase()](params, 'PUT', params.logger);
    return response;
  },

  patch: async (params, agent = config.agents.default) => {
    validation(params, agent.toLowerCase(), params.logger);
    const response = await agents[agent.toLowerCase()](params, 'PATCH', params.logger);
    return response;
  },

  head: async (params, agent = config.agents.default) => {
    validation(params, agent.toLowerCase(), params.logger);
    const response = await agents[agent.toLowerCase()](params, 'HEAD', params.logger);
    return response;
  },

  delete: async (params, agent = config.agents.default) => {
    validation(params, agent.toLowerCase(), params.logger);
    const response = await agents[agent.toLowerCase()](params, 'DELETE', params.logger);
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
