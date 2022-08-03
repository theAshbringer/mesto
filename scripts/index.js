import initialCards from './cards.js';
import Card from './Card.js';
import FormValidator from './FormValidator.js';

// Кнопки
const btnEdit = document.querySelector('.edit-btn');
const btnAdd = document.querySelector('.add-btn');
const btnSubmitAddForm = document.querySelector('.add-card .save-btn');

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

// Начальные значения полей формы редактирования
const nameFieldInit = document.querySelector('.profile__name');
const descriptionFieldInit = document.querySelector('.profile__description');

const keyEscape = 'Escape';

const leftButtonNumber = 0;

/** Обработчик события клика на кнопку Esc */
const escapeKeyHandler = (evt) => {
  if (evt.key === keyEscape) {
    const popupElement = document.querySelector('.popup_opened');
    closePopup(popupElement);
  }
};

/** Обработчик события клика на оверлей попапа*/
const clicksToCloseHandler = (evt) => {
  if (
    (evt.target.classList.contains('popup') ||
      evt.target.classList.contains('popup__close')) &&
    evt.button === leftButtonNumber
  ) {
    closePopup(evt.currentTarget);
  }
};

/** Открыть попап */
const openPopup = (popup) => {
  popup.classList.add('popup_opened');
  window.addEventListener('keydown', escapeKeyHandler);
  popup.addEventListener('mousedown', clicksToCloseHandler);
};

/** Закрыть попап */
const closePopup = (popup) => {
  popup.classList.remove('popup_opened');
  window.removeEventListener('keydown', escapeKeyHandler);
  popup.removeEventListener('mousedown', clicksToCloseHandler);
};

/** Отрисовать карточку */
const renderCard = (card) => {
  const cardList = document.querySelector('.cards');
  cardList.prepend(card.generateCard());
};

/** Отобразить начальные карточки при загрузке страницы */
const initializeCards = () => {
  initialCards.forEach((item) => {
    const card = new Card(
      { title: item.name, image: item.link },
      cardTemplateSelector,
      openPopup
    );
    renderCard(card);
  });
};

/** Обработчик отправки формы редактирования профиля */
const editFormSubmitHandler = (evt) => {
  evt.preventDefault();
  nameFieldInit.innerText = nameField.value;
  descriptionFieldInit.innerText = descriptionField.value;
  closePopup(popupEdit);
};

/** Обработчик отправки формы добавления карточки */
const addFormSubmitHandler = (evt) => {
  evt.preventDefault();
  const card = new Card(
    { title: cardTitleField.value, image: cardLinkField.value },
    cardTemplateSelector,
    openPopup
  );
  renderCard(card);
  formAdd.reset();
  btnSubmitAddForm.classList.add('popup__button_disabled');
  btnSubmitAddForm.setAttribute('disabled', 'disabled');
  closePopup(popupAdd);
};

// Событие "Редактировать профиль"
btnEdit.addEventListener('click', () => {
  openPopup(popupEdit);
  nameField.value = nameFieldInit.innerText;
  descriptionField.value = descriptionFieldInit.innerText;
});
// Событие "Добавить карточку"
btnAdd.addEventListener('click', () => openPopup(popupAdd));
// Событие "Сохранить форму"
formEdit.addEventListener('submit', editFormSubmitHandler);
// Событие "Сохранить форму"
formAdd.addEventListener('submit', addFormSubmitHandler);

initializeCards();

// Валидация форм
const formAddValidation = new FormValidator(
  {
    inputSelector: '.popup__field',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__field_invalid',
    errorClass: 'popup__input-error_active',
  },
  formAdd
);
formAddValidation.enableValidation();

const formEditValidation = new FormValidator(
  {
    inputSelector: '.popup__field',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__field_invalid',
    errorClass: 'popup__input-error_active',
  },
  formEdit
);
formEditValidation.enableValidation();
