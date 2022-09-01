export default class Api {
  constructor({ baseUrl, authToken }) {
    this._baseUrl = baseUrl;
    this._authToken = authToken;
  }

  get(url) {
    return fetch(`${this._baseUrl}${url}`, {
      headers: {
        authorization: this._authToken,
      },
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
    });
  }

  patch({ url, body }) {
    return fetch(`${this._baseUrl}${url}`, {
      method: 'PATCH',
      headers: {
        authorization: this._authToken,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
    });
  }

  post({ url, body }) {
    return fetch(`${this._baseUrl}${url}`, {
      method: 'POST',
      headers: {
        authorization: this._authToken,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
    });
  }

  put(url) {
    return fetch(`${this._baseUrl}${url}`, {
      method: 'PUT',
      headers: {
        authorization: this._authToken,
      },
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
    });
  }

  delete(url) {
    return fetch(`${this._baseUrl}${url}`, {
      method: 'DELETE',
      headers: {
        authorization: this._authToken,
      },
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
    });
  }

  /** Загрузить карточки с сервера */
  getInitialCards() {
    return this.get('cards')
      .then((cards) => {
        return cards;
      })
      .catch((err) => {
        console.log('Не удалось инициализировать карточки: ', err.status);
      });
  }
}
