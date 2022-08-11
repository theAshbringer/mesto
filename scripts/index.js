import initialCards from './cards.js';
import Card from './Card.js';
import FormValidator from './FormValidator.js';
import Section from './Section.js';
import PopupWithImage from './PopupWithImage.js';

// Кнопки
const btnEdit = document.querySelector('.edit-btn');
const btnAdd = document.querySelector('.add-btn');

// Селектор шаблона карточки
const cardTemplateSelector = '#card-template';

// Попапы
const popupEdit = document.querySelector('.popup_type_edit');
const popupAdd = document.querySelector('.popup_type_add');

// Контейнеры попапов
const formEdit = document.querySelector('.edit-profile');
const formAdd = document.querySelector('.add-card');

// Поля форм
const nameField = document.querySelector('.popup__field_type_name');
const descriptionField = document.querySelector(
  '.popup__field_type_description'
);
const cardTitleField = document.querySelector('.popup__field_type_card-name');
const cardLinkField = document.querySelector('.popup__field_type_card-link');
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
const handleEditFormSubmit = (evt) => {
  evt.preventDefault();
  nameFieldInit.innerText = nameField.value;
  descriptionFieldInit.innerText = descriptionField.value;
  closePopup(popupEdit);
};

/** Обработчик отправки формы добавления карточки */
const handleAddFormSubmit = (evt) => {
  evt.preventDefault();
  const card = createCard(
    cardTitleField.value,
    cardLinkField.value,
    cardTemplateSelector
  );
  cardList.addItem(card);
  formAdd.reset();
  formValidators['add-card'].disableButton();
  closePopup(popupAdd);
};

// Событие "Редактировать профиль"
btnEdit.addEventListener('click', () => {
  formValidators['edit-profile'].resetValidation();
  openPopup(popupEdit);
  nameField.value = nameFieldInit.innerText;
  descriptionField.value = descriptionFieldInit.innerText;
});
// Событие "Добавить карточку"
btnAdd.addEventListener('click', () => {
  formValidators['add-card'].resetValidation();
  openPopup(popupAdd);
});
// Событие "Сохранить форму"
formEdit.addEventListener('submit', handleEditFormSubmit);
// Событие "Сохранить форму"
formAdd.addEventListener('submit', handleAddFormSubmit);

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
