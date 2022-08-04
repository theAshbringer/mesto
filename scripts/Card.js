const popupCard = document.querySelector('.popup_type_img');
const popupCardTitle = popupCard.querySelector('.img-popup__title');
const popupCardPicture = popupCard.querySelector('.img-popup__image');

export default class Card {
  constructor(data, templateSelector, openPopup) {
    this._title = data.title;
    this._alt = data.title;
    this._image = data.image;
    this._templateSelector = templateSelector;
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
  _handleDeleteButton = () => {
    this._element.remove();
  };

  /** Поставить лайк */
  _handleLikeButton = (evt) => {
    evt.target.classList.toggle('like-btn_active');
  };

  /** Отобразить карточку в попапе */
  _showImage = () => {
    popupCardTitle.textContent = this._title;
    popupCardPicture.alt = this._title;
    popupCardPicture.src = this._image;
    this._openPopup(popupCard);
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
