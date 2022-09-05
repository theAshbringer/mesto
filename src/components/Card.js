export default class Card {
  constructor(
    data,
    templateSelector,
    { handleCardClick, handleDeleteCard },
    api,
    userId
  ) {
    this._id = data.id;
    this._title = data.title;
    this._alt = data.title;
    this._image = data.image;
    this._likes = data.likes;
    this._userId = userId;
    this._owner = data.owner;
    this._isOwner = this._owner === this._userId;
    this._liked = this._likes.map((item) => item._id).includes(this._userId);
    this._templateSelector = templateSelector;
    this._template = document.querySelector(this._templateSelector).content;
    this._cardElement = this._template.querySelector('.card');
    this._handleCardClick = handleCardClick;
    this._handleDeleteCard = handleDeleteCard;
    this._api = api;
  }

  /** Достать элемент карточки из шаблона */
  _getTemplate() {
    this._element = this._cardElement.cloneNode(true);
  }

  /** Удалить карточку по щелчку на корзину */
  _handleDeleteButton = () => {
    this._handleDeleteCard(this);
  };

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
      this._api
        .likeCard(this._id)
        .then(({ likes }) => {
          this._likes = likes;
          this._likeNumberElement.textContent = this._likes.length;
          this._liked = true;
          this._toggleLike();
        })
        .catch((err) => {
          console.log('Не удалось поставить лайк: ', err);
        });
    } else {
      this._api
        .dislikeCard(this._id)
        .then(({ likes }) => {
          this._likes = likes;
          this._likeNumberElement.textContent = this._likes.length;
          this._liked = false;
          this._toggleLike();
        })
        .catch((err) => {
          console.log('Не удалось убрать лайк: ', err);
        });
    }
  };

  /** Удалить кнопку удаления карточки, если карточка чужая */
  _removeDeleteBtnIfForeign() {
    this._deleteBtn = this._element.querySelector('.card__delete');
    if (!this._isOwner) {
      this._deleteBtn.remove();
      this._deleteBtn = '';
    }
  }

  /** Установить слушатели на элементы карточки */
  _setEventListeners() {
    if (this._deleteBtn) {
      this._deleteBtn.addEventListener('click', this._handleDeleteButton);
    }

    this._element
      .querySelector('.card__like-btn')
      .addEventListener('click', this._handleLikeButton);

    this._element
      .querySelector('.card__onclick')
      .addEventListener('click', () =>
        this._handleCardClick(this._title, this._image)
      );
  }

  /** Удалить элемент карточки */
  removeElement() {
    this._element.remove();
    this._element = null;
  }

  /** Сгенерировать готовую карточку */
  generateCard() {
    this._getTemplate();
    this._toggleLike();
    this._removeDeleteBtnIfForeign();
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
}
