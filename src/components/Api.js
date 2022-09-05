export default class Api {
  constructor({ baseUrl, authToken }) {
    this._baseUrl = baseUrl;
    this._authToken = authToken;
  }

  _handleResponse(res) {
    if (!res.ok) {
      Promise.reject(`Ошибка!: ${res.status}`);
    }
    return res.json();
  }

  patch({ url, body }) {
    return fetch(`${this._baseUrl}${url}`, {
      method: 'PATCH',
      headers: {
        authorization: this._authToken,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    }).then((res) => this._handleResponse(res));
  }

  put(url) {
    return fetch(`${this._baseUrl}${url}`, {
      method: 'PUT',
      headers: {
        authorization: this._authToken,
      },
    }).then((res) => this._handleResponse(res));
  }

  deleteCard(cardId) {
    return fetch(`${this._baseUrl}cards/${cardId}`, {
      method: 'DELETE',
      headers: {
        authorization: this._authToken,
      },
    }).then((res) => this._handleResponse(res));
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}cards`, {
      headers: {
        authorization: this._authToken,
      },
    }).then((res) => this._handleResponse(res));
  }

  getUserInfo() {
    return fetch(`${this._baseUrl}users/me`, {
      headers: {
        authorization: this._authToken,
      },
    }).then((res) => this._handleResponse(res));
  }

  postCard(body) {
    return fetch(`${this._baseUrl}cards`, {
      method: 'POST',
      headers: {
        authorization: this._authToken,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    }).then((res) => this._handleResponse(res));
  }

  /** Обновить данные профиля с сервера */
  updateUserInfo({ name, description }) {
    return this.patch({
      url: 'users/me',
      body: {
        name: name,
        about: description,
      },
    }).catch((err) => {
      console.log('Не удалось обновить профиль: ', err.status);
    });
  }
}
