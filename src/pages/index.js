import './index.css';
import {
  profileElement,
  btnAdd,
  btnEdit,
  cardListSelector,
  cardTemplateSelector,
  baseUrl,
  authToken,
  btnAvatar,
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

/** Обработчик удаления карточки */
const handleLike = (card) => {
  api
    .likeCard(card._id)
    .then(({ likes }) => {
      card._likes = likes;
      card._likeNumberElement.textContent = card._likes.length;
      card._liked = true;
      card._toggleLike();
    })
    .catch((err) => {
      console.log('Не удалось поставить лайк: ', err);
    });
};

/** Обработчик удаления карточки */
const handleDislike = (card) => {
  api
    .dislikeCard(card._id)
    .then(({ likes }) => {
      card._likes = likes;
      card._likeNumberElement.textContent = card._likes.length;
      card._liked = false;
      card._toggleLike();
    })
    .catch((err) => {
      console.log('Не удалось убрать лайк: ', err);
    });
};

/** Создать карточку */
const createCard = ({ id, title, image, likes, owner }, templateSelector) => {
  const card = new Card(
    { id, title, image, likes, owner },
    templateSelector,
    {
      handleCardClick,
      handleDeleteCard,
      handleLike,
      handleDislike,
    },
    api,
    myId
  ).generateCard();
  return card;
};

// Создаем контейнер с карточками
const cardList = new Section((item) => {
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
  .loadUserInfo()
  .then((res) => {
    myId = res._id;
  })
  .catch((err) => {
    console.log('Не удалось загрузить данные профиля: ', err.status);
  })
  .then(() => {
    api
      .getInitialCards()
      .then((cards) => {
        cardList.renderItems(cards);
      })
      .catch((err) => {
        console.log('Не удалось инициализировать карточки: ', err.status);
      });
  });

/** Обработчик клика по аватарке */
const handleAvatarClick = () => {
  formValidators['edit-avatar'].resetValidation();
  popupAvatar.open();
};

const profile = new UserInfo({
  nameSelector: '.profile__name',
  descriptionSelector: '.profile__description',
  avatarSelector: '.profile__avatar',
});

/** Загрузить данные профиля */
function loadProfile() {
  api.loadUserInfo().then(({ name, about, avatar }) => {
    // убрать повторный вызов
    profile.setUserInfo({ name, description: about });
    profile.setAvatar(avatar);
    profileElement.classList.add('profile_active');
  });
}

loadProfile();

const popupCard = new PopupWithImage('.popup_type_img');
popupCard.setEventListeners();

/** Обработчик удаления карточки */
const handlePopupDeleteSubmit = (card) => {
  api
    .deleteCard(card._id)
    .then(() => {
      card.removeElement();
      popupDelete.close();
    })
    .catch((err) => {
      console.log('Не удалось удалить карточку: ', err);
    });
};

const popupDelete = new PopupDelete('.popup_type_del', handlePopupDeleteSubmit);
popupDelete.setEventListeners();

/** Обновить */
function updateProfile({ name, description }) {
  api
    .updateUserInfo({ name, description })
    .then((profileInfo) => {
      profile.setUserInfo({
        name: profileInfo.name,
        description: profileInfo.about,
      });
      popupEdit.close();
    })
    .catch((err) => {
      console.log('Не удалось обновить профиль: ', err.status);
    })
    .finally(() => {
      popupEdit.renderSaving(false);
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
    .postCard({
      name: formData['card-name'],
      link: formData['card-description'],
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
      popupAdd.close();
    })
    .catch((err) => {
      console.log('Не удалось запостить карточку: ', err);
    })
    .finally(() => {
      formValidators['add-card'].disableButton();
      popupAdd.renderSaving(false);
    });
};

/** Обработчик отправки новой аватарки */
const handleAvatarFormSubmit = (formData) => {
  api
    .updateAvatar(formData['avatar-link'])
    .then((res) => {
      profile.setAvatar(res.avatar);
      popupAvatar.close();
    })
    .catch((err) => {
      console.log('Не удалось обновить аватар: ', err);
    })
    .finally(() => {
      formValidators['edit-avatar'].disableButton();
      popupAvatar.renderSaving(false);
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

// Обработчик клика по кнопке редактирования профиля
btnEdit.addEventListener('click', () => {
  formValidators['edit-profile'].resetValidation();
  api.loadUserInfo().then(({ name, about }) => {
    // убрать вызов get
    popupEdit.setInputValues({
      'profile-name': name,
      'profile-description': about,
    });
    popupEdit.open();
  });
});

// Обработчик клика по кнопке добавления карточки
btnAdd.addEventListener('click', () => {
  formValidators['add-card'].resetValidation();
  popupAdd.open();
});

// Обработчик клика по аве
btnAvatar.addEventListener('click', handleAvatarClick);

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
