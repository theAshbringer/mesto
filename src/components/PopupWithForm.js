import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(popupSelector, submitCallback) {
    super(popupSelector);
    this._submitCallback = submitCallback;
    this._form = this._popup.querySelector('.popup__container');
    this._inputList = this._form.querySelectorAll('.popup__field');
    this._button = this._form.querySelector('.popup__button');
  }

  /** Собрать данные всех полей */
  _getInputValues() {
    const formValues = {};
    this._inputList.forEach((input) => {
      formValues[input.name] = input.value;
    });
    return formValues;
  }

  /** Собрать данные всех полей */
  setInputValues(data) {
    this._inputList.forEach((input) => {
      input.value = data[input.name];
    });
  }

  renderSaving(isLoading) {
    if (isLoading) {
      this._button.textContent = 'Сохранение...';
    } else {
      this._button.textContent = 'Сохранить';
    }
  }

  /** Обработчик отправки формы */
  _handleSubmit = (evt) => {
    evt.preventDefault();
    this.renderSaving(true);
    this._submitCallback(this._getInputValues());
  };

  /** Навесить слушатели */
  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', this._handleSubmit);
  }

  /** Закрыть попап */
  close() {
    super.close();
    this._form.reset();
  }
}
