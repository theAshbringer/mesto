import { authToken } from '../utils/constants';

export default class UserInfo {
  constructor({ nameSelector, descriptionSelector, avatarSelector }) {
    this._name = document.querySelector(nameSelector);
    this._description = document.querySelector(descriptionSelector);
    this._avatar = document.querySelector(avatarSelector);
  }

  getUserInfo() {
    return fetch('https://mesto.nomoreparties.co/v1/cohort-49/users/me ', {
      headers: {
        authorization: authToken,
      },
    })
      .then((res) => res.json())
      .catch(() => {
        console.log('Не удалось загрузить профиль');
      });
  }

  loadUserInfo() {
    this.getUserInfo().then(({ name, about, avatar }) => {
      this._setUserInfo({ name, description: about });
      this._setAvatar(avatar);
    });
  }

  _setUserInfo({ name, description }) {
    this._name.textContent = name;
    this._description.textContent = description;
  }

  updateUserInfo({ name, description }) {
    fetch('https://mesto.nomoreparties.co/v1/cohort-49/users/me', {
      method: 'PATCH',
      headers: {
        authorization: authToken,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: name,
        about: description,
      }),
    })
      .then((res) => res.json())
      .then((profileInfo) => {
        this._setUserInfo({
          name: profileInfo.name,
          description: profileInfo.about,
        });
      })
      .catch(() => {
        console.log('Не удалось обновить профиль');
      });
  }

  _setAvatar(avatarLink) {
    this._avatar.src = avatarLink;
  }
}
