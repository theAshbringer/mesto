export default class Api {
  constructor({ baseUrl, authToken }) {
    this._baseUrl = baseUrl;
    this._authToken = authToken;
  }

  async get(url) {
    const res = await fetch(`${this._baseUrl}${url}`, {
      headers: {
        authorization: this._authToken,
      },
    });
    return await res.json();
  }

  async patch({ url, body }) {
    const res = await fetch(`${this._baseUrl}${url}`, {
      method: 'PATCH',
      headers: {
        authorization: this._authToken,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
    return await res.json();
  }

  async post({ url, body }) {
    const res = await fetch(`${this._baseUrl}${url}`, {
      method: 'POST',
      headers: {
        authorization: this._authToken,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
    return await res.json();
  }
}
