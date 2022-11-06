class ProviderError extends Error {
  constructor(code, message) {
    super();
    if (code) this.code = code;
    if (message) this.message = message;
  }
}

module.exports = ProviderError;
