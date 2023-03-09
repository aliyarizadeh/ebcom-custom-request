const config = require('./config');
const { agents, validation } = require('./lib');

const methods = {
  get: async (params, agent = config.agents.default) => {
    validation(params, agent.toLowerCase(), params.log);
    const response = await agents[agent.toLowerCase()](params, 'GET', params.log);
    return response;
  },

  post: async (params, agent = config.agents.default) => {
    validation(params, agent.toLowerCase(), params.log);
    const response = await agents[agent.toLowerCase()](params, 'POST', params.log);
    return response;
  },

  put: async (params, agent = config.agents.default) => {
    validation(params, agent.toLowerCase(), params.log);
    const response = await agents[agent.toLowerCase()](params, 'PUT', params.log);
    return response;
  },

  patch: async (params, agent = config.agents.default) => {
    validation(params, agent.toLowerCase(), params.log);
    const response = await agents[agent.toLowerCase()](params, 'PATCH', params.log);
    return response;
  },

  head: async (params, agent = config.agents.default) => {
    validation(params, agent.toLowerCase(), params.log);
    const response = await agents[agent.toLowerCase()](params, 'HEAD', params.log);
    return response;
  },

  delete: async (params, agent = config.agents.default) => {
    validation(params, agent.toLowerCase(), params.log);
    const response = await agents[agent.toLowerCase()](params, 'DELETE', params.log);
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
