import './index.css';
import {
  btnAdd,
  btnEdit,
  cardListSelector,
  cardTemplateSelector,
  baseUrl,
  authToken,
} from '../utils/constants.js';
import Api from '../components/Api';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupDelete from '../components/PopupDelete.js';
import UserInfo from '../components/UserInfo.js';

const api = new Api({ baseUrl, authToken });

/** Обработчик клика на карточку */
const handleCardClick = (name, link) => {
  popupCard.open(name, link);
};

/** Обработчик удаления карточки */
const handleDeleteCard = (card) => {
  popupDelete.card = card;
  popupDelete.open();
};

/** Создать карточку */
const createCard = ({ id, title, image, likes, owner }, templateSelector) => {
  const card = new Card(
    { id, title, image, likes, owner },
    templateSelector,
    {
      handleCardClick,
      handleDeleteCard,
    },
    api,
    myId
  ).generateCard();
  return card;
};

// Создаем контейнер с карточками
const cardList = new Section(async (item) => {
  return createCard(
    {
      id: item._id,
      title: item.name,
      image: item.link,
      likes: item.likes,
      owner: item.owner._id,
    },
    cardTemplateSelector
  );
}, cardListSelector);

// Инициализация карточек
let myId = '';
api
  .get('users/me')
  .then((res) => {
    myId = res._id;
  })
  .then(() => {
    api.getInitialCards().then((cards) => {
      cardList.renderItems(cards);
    });
  });

/** Обработчик клика по аватарке */
const handleAvatarClick = () => {
  popupAvatar.open();
};

const profile = new UserInfo(
  {
    nameSelector: '.profile__name',
    descriptionSelector: '.profile__description',
    avatarSelector: '.profile__avatar',
  },
  handleAvatarClick
);

/** Загрузить данные профиля */
function loadProfile() {
  api.getUserInfo().then(({ name, about, avatar }) => {
    profile.setUserInfo({ name, description: about });
    profile.setAvatar(avatar);
    profile.setEventListeners();
  });
}

loadProfile();

const popupCard = new PopupWithImage('.popup_type_img');
popupCard.setEventListeners();

/** Обработчик удаления карточки */
const handlePopupDeleteSubmit = (card) => {
  api.delete(`cards/${card._id}`).then(() => {
    card.removeElement();
  });
};

const popupDelete = new PopupDelete('.popup_type_del', handlePopupDeleteSubmit);
popupDelete.setEventListeners();

/** Обновить */
function updateProfile({ name, description }) {
  api.updateUserInfo({ name, description }).then((profileInfo) => {
    profile.setUserInfo({
      name: profileInfo.name,
      description: profileInfo.about,
    });
  });
}

/** Обработчик отправки формы редактирования профиля */
const handleEditFormSubmit = (formData) => {
  updateProfile({
    name: formData['profile-name'],
    description: formData['profile-description'],
  });
};

/** Обработчик отправки формы добавления карточки */
const handleAddFormSubmit = (formData) => {
  api
    .post({
      url: 'cards',
      body: {
        name: formData['card-name'],
        link: formData['card-description'],
      },
    })
    .then((res) => {
      const card = createCard(
        {
          id: res._id,
          title: res.name,
          image: res.link,
          likes: res.likes,
          owner: res.owner._id,
        },
        cardTemplateSelector
      );
      cardList.addItem(card);
    })
    .catch((err) => {
      console.log('Не удалось запостить карточку: ', err);
    })
    .finally(() => {
      formValidators['add-card'].disableButton();
    });
};

/** Обработчик отправки новой аватарки */
const handleAvatarFormSubmit = (formData) => {
  api
    .patch({
      url: 'users/me/avatar',
      body: {
        avatar: formData['avatar-link'],
      },
    })
    .then((res) => {
      profile.setAvatar(res.avatar);
    });
};

const popupEdit = new PopupWithForm('.popup_type_edit', handleEditFormSubmit);
const popupAdd = new PopupWithForm('.popup_type_add', handleAddFormSubmit);
const popupAvatar = new PopupWithForm(
  '.popup_type_avatar',
  handleAvatarFormSubmit
);
popupEdit.setEventListeners();
popupAdd.setEventListeners();
popupAvatar.setEventListeners();

// Событие "Редактировать профиль"
btnEdit.addEventListener('click', () => {
  formValidators['edit-profile'].resetValidation();
  api.getUserInfo().then(({ name, about }) => {
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
