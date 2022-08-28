import './index.css';
import {
  authToken,
  btnAdd,
  btnEdit,
  cardListSelector,
  cardTemplateSelector,
  initialCards,
} from '../utils/constants.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';

const popupCard = new PopupWithImage('.popup_type_img');
popupCard.setEventListeners();

/** Обработчик клика на карточку */
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
const cardList = new Section((item) => {
  return createCard(item.name, item.link, cardTemplateSelector);
}, cardListSelector);

const profile = new UserInfo({
  nameSelector: '.profile__name',
  descriptionSelector: '.profile__description',
  avatarSelector: '.profile__avatar',
});

/** Загрузить карточки с сервера */
const initializeCards = () => {
  fetch('https://mesto.nomoreparties.co/v1/cohort-49/cards ', {
    headers: {
      authorization: authToken,
    },
  })
    .then((res) => res.json())
    .then((cards) => {
      cardList.renderItems(cards);
    })
    .catch((err) => {
      console.log(err);
    });
};

initializeCards();
profile.loadUserInfo();

/** Обработчик отправки формы редактирования профиля */
const handleEditFormSubmit = (formData) => {
  profile.updateUserInfo({
    name: formData['profile-name'],
    description: formData['profile-description'],
  });
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
popupEdit.setEventListeners();
popupAdd.setEventListeners();

// Событие "Редактировать профиль"
btnEdit.addEventListener('click', () => {
  formValidators['edit-profile'].resetValidation();
  profile.getUserInfo().then(({ name, about }) => {
    popupEdit.setInputValues({
      'profile-name': name,
      'profile-description': about,
    });
    popupEdit.open();
  });
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
