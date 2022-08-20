import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(popupSelector, submitCallback) {
    super(popupSelector);
    this._submitCallback = submitCallback;
    this._form = this._popup.querySelector('.popup__container');
    this._inputList = this._form.querySelectorAll('.popup__field');
  }

  /** Собрать данные всех полей */
  _getInputValues() {
    const formValues = {};
    this._inputList.forEach((input) => {
      formValues[input.name] = input.value;
    });
    return formValues;
  }

  /** Обработчик отправки формы */
  _handleSubmit = (evt) => {
    evt.preventDefault();
    this._submitCallback(this._getInputValues());
    this.close();
  };

  /** Навесить слушатели */
  _setEventListeners() {
    super._setEventListeners();
    this._form.addEventListener('submit', this._handleSubmit);
  }

  /** Убрать слушатели */
  _removeEventListeners() {
    super._removeEventListeners();
    this._form.removeEventListener('submit', this._handleSubmit);
  }

  /** Закрыть попап */
  close() {
    super.close();
    this._form.reset();
  }
}
