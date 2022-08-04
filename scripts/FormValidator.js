export default class FormValidator {
  constructor(options, form) {
    (this._inputSelector = options.inputSelector),
      (this._inactiveButtonClass = options.inactiveButtonClass),
      (this._inputErrorClass = options.inputErrorClass),
      (this._errorClass = options.errorClass),
      (this._form = form),
      (this._button = form.querySelector(options.submitButtonSelector));
  }

  /** Проверка, есть ли хоть одно невалидное поле */
  _hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  };

  /** Отключить кнопку */
  _disableButton() {
    this._button.classList.add(this._inactiveButtonClass);
    this._button.setAttribute('disabled', 'disabled');
  }

  /** Включить кнопку */
  _enableButton() {
    this._button.classList.remove(this._inactiveButtonClass);
    this._button.removeAttribute('disabled', 'disabled');
  }

  /** Переключение состояния кнопки */
  _toggleButtonState(inputList) {
    if (this._hasInvalidInput(inputList)) {
      this._disableButton();
    } else {
      this._enableButton();
    }
  }

  /** Показать ошибку */
  _showInputError(inputElement) {
    const errorElement = this._form.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = inputElement.validationMessage;
    errorElement.classList.add(this._errorClass);
  }

  /** Скрыть ошибку */
  _hideInputError(inputElement) {
    const errorElement = this._form.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = '';
  }

  /** Проверка поля на валидность */
  _isValid(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement);
    } else {
      this._hideInputError(inputElement);
    }
  }

  _inputHandler = (inputElement, inputList) => {
    this._isValid(inputElement);
    this._toggleButtonState(inputList);
  };

  /** Установить слушатели на форму */
  _setEventListeners() {
    const inputList = Array.from(
      this._form.querySelectorAll(this._inputSelector)
    );

    // Изначально деактивируем кнопку, только если все поля формы пустые
    if (inputList.every((inputElement) => !inputElement.value)) {
      this._toggleButtonState(inputList);
    }

    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () =>
        this._inputHandler(inputElement, inputList)
      );
    });
  }

  /** Включить валидацию */
  enableValidation() {
    this._setEventListeners();
  }
}
