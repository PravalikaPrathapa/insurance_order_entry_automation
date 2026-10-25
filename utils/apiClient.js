const { expect } = require('@playwright/test');

class ApiClient {
  constructor(request) {
    this.request = request;
  }

  async get(path) {
    const response = await this.request.get(path);
    expect(response.ok(), `GET ${path} failed with ${response.status()}`).toBeTruthy();
    return response;
  }

  async post(path, data) {
    const response = await this.request.post(path, { data });
    expect(response.ok(), `POST ${path} failed with ${response.status()}`).toBeTruthy();
    return response;
  }
}

module.exports = { ApiClient };
