export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._closeBtn = this._popup.querySelector('.popup__close');
    this._overlaySelector = 'popup';
  }

  /** Обработчик события клика на кнопку Esc */
  _handleEscKey = (evt) => {
    const keyEscape = 'Escape';
    if (evt.key === keyEscape) {
      this.close();
    }
  };

  /** Обработчик события клика на оверлей попапа*/
  _handleOverlayClose = (evt) => {
    const leftButtonNumber = 0;
    if (
      evt.target.classList.contains(this._overlaySelector) &&
      evt.button === leftButtonNumber
    ) {
      this.close();
    }
  };

  /** Обработчик события клика на кнопку "закрыть"*/
  _handleCloseBtn = () => {
    this.close();
  };

  /** Открыть попап */
  open() {
    this._popup.classList.add('popup_opened');
    window.addEventListener('keydown', this._handleEscKey);
  }

  /** Закрыть попап */
  close() {
    this._popup.classList.remove('popup_opened');
    window.removeEventListener('keydown', this._handleEscKey);
  }

  /** Навесить слушатели */
  setEventListeners() {
    this._popup.addEventListener('mousedown', this._handleOverlayClose);
    this._closeBtn.addEventListener('click', this._handleCloseBtn);
  }
}
