import { myId } from '../utils/constants';

export default class Card {
  constructor(data, templateSelector, { handleCardClick }, api) {
    this._id = data.id;
    this._title = data.title;
    this._alt = data.title;
    this._image = data.image;
    this._likes = data.likes;
    this._liked = this._likes.map((item) => item._id).includes(myId);
    this._templateSelector = templateSelector;
    this._template = document.querySelector(this._templateSelector).content;
    this._cardElement = this._template.querySelector('.card');
    this._handleCardClick = handleCardClick;
    this._api = api;
  }

  /** Достать элемент карточки из шаблона */
  _getTemplate() {
    this._element = this._cardElement.cloneNode(true);
  }

  /** Удалить карточку по щелчку на корзину */
  _handleDeleteButton = () => {};

  /** Переключить лайк в зависимости от состояния */
  _toggleLike() {
    if (this._liked) {
      this._element.querySelector('.like-btn').classList.add('like-btn_active');
    } else {
      this._element
        .querySelector('.like-btn')
        .classList.remove('like-btn_active');
    }
  }

  /** Поставить лайк */
  _handleLikeButton = () => {
    if (!this._liked) {
      this._api.put(`cards/${this._id}/likes`).then(({ likes }) => {
        this._likes = likes;
        this._likeNumberElement.textContent = this._likes.length;
        this._liked = true;
        this._toggleLike();
      });
    } else {
      this._api.delete(`cards/${this._id}/likes`).then(({ likes }) => {
        this._likes = likes;
        this._likeNumberElement.textContent = this._likes.length;
        this._liked = false;
        this._toggleLike();
      });
    }
  };

  /** Установить слушатели на элементы карточки */
  _setEventListeners() {
    this._element
      .querySelector('.card__delete')
      .addEventListener('click', this._handleDeleteButton);

    this._element
      .querySelector('.card__like-btn')
      .addEventListener('click', this._handleLikeButton);

    this._element
      .querySelector('.card__onclick')
      .addEventListener('click', () =>
        this._handleCardClick(this._title, this._image)
      );
  }

  /** Сгенерировать готовую карточку */
  generateCard() {
    this._getTemplate();
    this._toggleLike();
    this._cardImageElement = this._element.querySelector('.card__photo');
    this._setEventListeners();
    this._cardImageElement.src = this._image;
    this._cardImageElement.alt = this._title;
    this._likeNumberElement = this._element.querySelector(
      '.card__likes-number'
    );
    this._likeNumberElement.textContent = this._likes.length;
    this._element.querySelector('.card__title').textContent = this._title;

    return this._element;
  }

  postCard() {
    return this._api.post({
      url: 'cards',
      body: {
        name: this._title,
        link: this._image,
      },
    });
  }
}
