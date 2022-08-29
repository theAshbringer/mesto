export default class Card {
  constructor(data, templateSelector, handleCardClick, api) {
    this._title = data.title;
    this._alt = data.title;
    this._image = data.image;
    this._likes = data.likes;
    this._templateSelector = templateSelector;
    this._template = document.querySelector(this._templateSelector).content;
    this._likesNumber = this._template.querySelector('.card__likes-number');
    this._handleCardClick = handleCardClick;
    this._api = api;
  }

  /** Достать элемент карточки из шаблона */
  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content.querySelector('.card')
      .cloneNode(true);

    return cardElement;
  }

  /** Удалить карточку по щелчку на корзину */
  _handleDeleteButton = () => {
    this._element.remove();
    this._element = null;
  };

  /** Поставить лайк */
  _handleLikeButton = (evt) => {
    evt.target.classList.toggle('like-btn_active');
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
    this._element = this._getTemplate();
    this._cardImageElement = this._element.querySelector('.card__photo');
    this._setEventListeners();
    this._cardImageElement.src = this._image;
    this._cardImageElement.alt = this._title;
    this._likesNumber.textContent = this._likes;
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
