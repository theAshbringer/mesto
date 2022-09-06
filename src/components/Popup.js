export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._closeBtn = this._popup.querySelector('.popup__close');
    this._overlaySelector = 'popup';
  }

  _handleEscKey = (evt) => {
    const keyEscape = 'Escape';
    if (evt.key === keyEscape) {
      this.close();
    }
  };

  _handleOverlayClose = (evt) => {
    const leftButtonNumber = 0;
    if (
      evt.target.classList.contains(this._overlaySelector) &&
      evt.button === leftButtonNumber
    ) {
      this.close();
    }
  };

  _handleCloseBtn = () => {
    this.close();
  };

  open() {
    this._popup.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscKey);
  }

  close() {
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscKey);
  }

  setEventListeners() {
    this._popup.addEventListener('mousedown', this._handleOverlayClose);
    this._closeBtn.addEventListener('click', this._handleCloseBtn);
  }
}
