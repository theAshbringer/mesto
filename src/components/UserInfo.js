export default class UserInfo {
  constructor(
    { nameSelector, descriptionSelector, avatarSelector },
    handleAvatarClick
  ) {
    this._name = document.querySelector(nameSelector);
    this._description = document.querySelector(descriptionSelector);
    this._avatar = document.querySelector(avatarSelector);
    this._handleAvatarClick = handleAvatarClick;
  }

  setUserInfo({ name, description }) {
    this._name.textContent = name;
    this._description.textContent = description;
  }

  setEventListeners() {
    this._avatar
      .closest('.profile__avatar-container')
      .addEventListener('click', this._handleAvatarClick);
  }

  setAvatar(avatarLink) {
    this._avatar.src = avatarLink;
  }
}
