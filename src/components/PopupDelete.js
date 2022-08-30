import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(popupSelector, submitCallback) {
    super(popupSelector);
    this._submitCallback = submitCallback;
    this._form = this._popup.querySelector('.popup__container');
    this.card = null;
  }

  /** Обработчик отправки формы */
  _handleSubmit = (evt) => {
    evt.preventDefault();
    this._submitCallback(this.card);
    this.close();
  };

  /** Навесить слушатели */
  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', this._handleSubmit);
  }
}
