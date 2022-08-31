export default class UserInfo {
  constructor({ nameSelector, descriptionSelector, avatarSelector }, api) {
    this._name = document.querySelector(nameSelector);
    this._description = document.querySelector(descriptionSelector);
    this._avatar = document.querySelector(avatarSelector);
    this._api = api;
  }

  _setUserInfo({ name, description }) {
    this._name.textContent = name;
    this._description.textContent = description;
  }

  setAvatar(avatarLink) {
    this._avatar.src = avatarLink;
  }

  getUserInfo() {
    return this._api.get('users/me');
  }

  loadUserInfo() {
    this.getUserInfo().then(({ name, about, avatar }) => {
      this._setUserInfo({ name, description: about });
      this.setAvatar(avatar);
    });
  }

  updateUserInfo({ name, description }) {
    this._api
      .patch({
        url: 'users/me',
        body: {
          name: name,
          about: description,
        },
      })
      .then((profileInfo) => {
        this._setUserInfo({
          name: profileInfo.name,
          description: profileInfo.about,
        });
      })
      .catch((err) => {
        console.log('Не удалось обновить профиль');
        console.log(err);
      });
  }
}
