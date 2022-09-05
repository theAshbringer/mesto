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

  get(url) {
    return fetch(`${this._baseUrl}${url}`, {
      headers: {
        authorization: this._authToken,
      },
    }).then((res) => this._handleResponse(res));
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

  post({ url, body }) {
    return fetch(`${this._baseUrl}${url}`, {
      method: 'POST',
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

  /** Загрузить данные профиля с сервера */
  getUserInfo() {
    return this.get('users/me').catch((err) => {
      console.log('Не удалось загрузить данные профиля: ', err.status);
    });
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
