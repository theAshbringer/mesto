import initialCards from './cards.js';
import Card from './Card.js';
import FormValidator from './FormValidator.js';
import Section from './Section.js';
import PopupWithImage from './PopupWithImage.js';
import PopupWithForm from './PopupWithForm.js';

// Кнопки
const btnEdit = document.querySelector('.edit-btn');
const btnAdd = document.querySelector('.add-btn');

// Селектор шаблона карточки
const cardTemplateSelector = '#card-template';

// Поля форм
const nameField = document.querySelector('.popup__field_type_name');
const descriptionField = document.querySelector(
  '.popup__field_type_description'
);

const cardListSelector = '.cards';

// Начальные значения полей формы редактирования
const nameFieldInit = document.querySelector('.profile__name');
const descriptionFieldInit = document.querySelector('.profile__description');

const popupCard = new PopupWithImage('.popup_type_img');

/** Обработчик отправки формы редактирования профиля */
const handleCardClick = (name, link) => {
  popupCard.open(name, link);
};

/** Создать карточку */
const createCard = (title, image, templateSelector) => {
  const card = new Card(
    { title: title, image: image },
    templateSelector,
    handleCardClick
  ).generateCard();
  return card;
};

// Создаем контейнер с карточками
const cardList = new Section(
  {
    items: initialCards,
    renderer(item) {
      return createCard(item.name, item.link, cardTemplateSelector);
    },
  },
  cardListSelector
);
cardList.renderItems();

/** Обработчик отправки формы редактирования профиля */
const handleEditFormSubmit = (formData) => {
  nameFieldInit.innerText = formData['profile-name'];
  descriptionFieldInit.innerText = formData['profile-description'];
};

/** Обработчик отправки формы добавления карточки */
const handleAddFormSubmit = (formData) => {
  const card = createCard(
    formData['card-name'],
    formData['card-description'],
    cardTemplateSelector
  );
  cardList.addItem(card);
  formValidators['add-card'].disableButton();
};

const popupEdit = new PopupWithForm('.popup_type_edit', handleEditFormSubmit);
const popupAdd = new PopupWithForm('.popup_type_add', handleAddFormSubmit);

// Событие "Редактировать профиль"
btnEdit.addEventListener('click', () => {
  formValidators['edit-profile'].resetValidation();
  popupEdit.open();
  nameField.value = nameFieldInit.innerText;
  descriptionField.value = descriptionFieldInit.innerText;
});

// Событие "Добавить карточку"
btnAdd.addEventListener('click', () => {
  formValidators['add-card'].resetValidation();
  popupAdd.open();
});

// Валидация форм
const formValidators = {};

const validationOptions = {
  formSelector: '.popup__container',
  inputSelector: '.popup__field',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__field_invalid',
  errorClass: 'popup__input-error_active',
};

// Включить валидацию
const enableValidation = (validationOptions) => {
  const formList = Array.from(
    document.querySelectorAll(validationOptions.formSelector)
  );
  formList.forEach((formElement) => {
    const validator = new FormValidator(validationOptions, formElement);
    const formName = formElement.getAttribute('name');

    formValidators[formName] = validator;
    validator.enableValidation();
  });
};

enableValidation(validationOptions);
