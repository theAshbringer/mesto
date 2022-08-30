import './index.css';
import {
  authToken,
  btnAdd,
  btnEdit,
  cardListSelector,
  cardTemplateSelector,
  initialCards,
  api,
} from '../utils/constants.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupDelete from '../components/PopupDelete.js';
import UserInfo from '../components/UserInfo.js';

const popupCard = new PopupWithImage('.popup_type_img');
popupCard.setEventListeners();

/** Обработчик клика на карточку */
const handleCardClick = (name, link) => {
  popupCard.open(name, link);
};

/** Создать карточку */
const createCard = ({ id, title, image, likes, isOwner }, templateSelector) => {
  const card = new Card(
    { id, title, image, likes, isOwner },
    templateSelector,
    {
      handleCardClick,
      handleDeleteCard,
    },
    api
  ).generateCard();
  return card;
};

// Создаем контейнер с карточками
const cardList = new Section(async (item) => {
  let isOwner = false;
  const myId = await userId;
  if (item.owner._id === myId) {
    isOwner = true;
  }
  return createCard(
    {
      id: item._id,
      title: item.name,
      image: item.link,
      likes: item.likes,
      isOwner: isOwner,
    },
    cardTemplateSelector
  );
}, cardListSelector);

const profile = new UserInfo(
  {
    nameSelector: '.profile__name',
    descriptionSelector: '.profile__description',
    avatarSelector: '.profile__avatar',
  },
  api
);

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

const popupDelete = new PopupDelete('.popup_type_del', handleDeleteSubmit);
popupDelete.setEventListeners();

/** Обработчик удаления карточки */
const handleDeleteCard = () => {
  popupDelete.open();
};

/** Обработчик отправки формы редактирования профиля */
const handleEditFormSubmit = (formData) => {
  profile.updateUserInfo({
    name: formData['profile-name'],
    description: formData['profile-description'],
  });
};

/** Обработчик отправки формы добавления карточки */
const handleAddFormSubmit = (formData) => {
  const card = new Card(
    {
      title: formData['card-name'],
      image: formData['card-description'],
      likes: [],
      isOwner: true,
    },
    cardTemplateSelector,
    { handleCardClick, handleDeleteCard },
    api
  );
  card
    .postCard()
    .then(() => {
      cardList.addItem(card.generateCard());
    })
    .catch((err) => {
      console.log('Не удалось запостить карточку');
      console.log(err);
    });
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
