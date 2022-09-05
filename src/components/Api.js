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

  updateAvatar(avatar) {
    return fetch(`${this._baseUrl}users/me/avatar`, {
      method: 'PATCH',
      headers: {
        authorization: this._authToken,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        avatar,
      }),
    }).then((res) => this._handleResponse(res));
  }

  likeCard(id) {
    return fetch(`${this._baseUrl}cards/${id}/likes`, {
      method: 'PUT',
      headers: {
        authorization: this._authToken,
      },
    }).then((res) => this._handleResponse(res));
  }

  dislikeCard(id) {
    return fetch(`${this._baseUrl}cards/${id}/likes`, {
      method: 'DELETE',
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

  updateUserInfo({ name, description }) {
    return this.updateAvatar({
      url: 'users/me',
      body: {
        name: name,
        about: description,
      },
    });
  }
}
