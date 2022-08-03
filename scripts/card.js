export default class Card {
  constructor(data, templateSelector, openPopup) {
    this._title = data.title;
    this._alt = data.title;
    this._image = data.image;
    this._templateSelector = templateSelector;
    this._cardPopup = document.querySelector('.popup_type_img');
    this._popupTitle = this._cardPopup.querySelector('.img-popup__title');
    this._popupPicture = this._cardPopup.querySelector('.img-popup__image');
    this._openPopup = openPopup;
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
  _deleteButtonHandler = () => {
    this._element.remove();
  };

  /** Поставить лайк */
  _likeButtonHandler = (evt) => {
    evt.target.classList.toggle('like-btn_active');
  };

  /** Отобразить карточку в попапе */
  _showImage = () => {
    this._popupTitle.alt = this._title;
    this._popupTitle.textContent = this._title;
    this._popupPicture.src = this._image;
    this._openPopup(this._cardPopup);
  };

  /** Установить слушатели на элементы карточки */
  _setEventListeners() {
    this._element
      .querySelector('.card__delete')
      .addEventListener('click', this._deleteButtonHandler);

    this._element
      .querySelector('.card__like-btn')
      .addEventListener('click', this._likeButtonHandler);

    this._element
      .querySelector('.card__onclick')
      .addEventListener('click', this._showImage);
  }

  /** Сгенерировать готовую карточку */
  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();
    this._element.querySelector('.card__photo').src = this._image;
    this._element.querySelector('.card__photo').alt = this._title;
    this._element.querySelector('.card__title').textContent = this._title;

    return this._element;
  }
}