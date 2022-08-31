export default class UserInfo {
  constructor(
    { nameSelector, descriptionSelector, avatarSelector },
    handleAvatarClick,
    api
  ) {
    this._name = document.querySelector(nameSelector);
    this._description = document.querySelector(descriptionSelector);
    this._avatar = document.querySelector(avatarSelector);
    this._handleAvatarClick = handleAvatarClick;
    this._api = api;
  }

  _setUserInfo({ name, description }) {
    this._name.textContent = name;
    this._description.textContent = description;
  }

  _setEventListeners() {
    this._avatar
      .closest('.profile__avatar-container')
      .addEventListener('click', this._handleAvatarClick);
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
      this._setEventListeners();
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
