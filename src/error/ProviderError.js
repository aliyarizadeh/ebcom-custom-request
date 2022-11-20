class ProviderError extends Error {
  constructor(statusCode, code, message) {
    super();
    if (code) this.code = code;
    if (statusCode) this.statusCode = statusCode;
    if (message) this.message = message;
  }
}

module.exports = ProviderError;
