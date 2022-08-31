export default class Api {
  constructor({ baseUrl, authToken }, { handleInitialCards }) {
    this._baseUrl = baseUrl;
    this._authToken = authToken;
    this._handleInitialCards = handleInitialCards;
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

  async put(url) {
    const res = await fetch(`${this._baseUrl}${url}`, {
      method: 'PUT',
      headers: {
        authorization: this._authToken,
      },
    });
    return await res.json();
  }

  async delete(url) {
    const res = await fetch(`${this._baseUrl}${url}`, {
      method: 'DELETE',
      headers: {
        authorization: this._authToken,
      },
    });
    return await res.json();
  }

  /** Загрузить карточки с сервера */
  getInitialCards() {
    this.get('cards')
      .then((cards) => {
        this._handleInitialCards(cards);
      })
      .catch((err) => {
        console.log('Не удалось инициализировать карточки: ', err.status);
      });
  }
}
