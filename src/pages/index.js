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
  validationOptions,
  profileOptions,
  cardOptions,
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

const handleCardClick = (name, link) => {
  popupCard.open(name, link);
};

const handleDeleteCard = (card) => {
  popupDelete.card = card;
  popupDelete.open();
};

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
    myId,
    cardOptions
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

// Загрузка профиля и карточек
let myId = '';
Promise.all([api.loadUserInfo(), api.getInitialCards()])
  .then(([{ name, about, avatar, _id }, cards]) => {
    myId = _id;
    profile.setUserInfo({ name, description: about });
    profile.setAvatar(avatar);
    profileElement.classList.add(profileOptions.activeClass);
    cardList.renderItems(cards);
  })
  .catch((err) => {
    console.log('Не удалось загрузить данные профиля/карточек: ', err.status);
  });

const handleAvatarClick = () => {
  formValidators['edit-avatar'].resetValidation();
  popupAvatar.open();
};

const profile = new UserInfo(profileOptions);

const popupCard = new PopupWithImage('.popup_type_img');
popupCard.setEventListeners();

/** Обработчик удаления карточки */
const handlePopupDeleteSubmit = (card) => {
  api
    .deleteCard(card._id)
    .then(() => {
      card.removeCardElement();
      popupDelete.close();
    })
    .catch((err) => {
      console.log('Не удалось удалить карточку: ', err);
    });
};

const popupDelete = new PopupDelete('.popup_type_del', handlePopupDeleteSubmit);
popupDelete.setEventListeners();

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
      cardList.prependItem(card);
      popupAdd.close();
      formValidators['add-card'].disableButton();
    })
    .catch((err) => {
      console.log('Не удалось запостить карточку: ', err);
    })
    .finally(() => {
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
      formValidators['edit-avatar'].disableButton();
    })
    .catch((err) => {
      console.log('Не удалось обновить аватар: ', err);
    })
    .finally(() => {
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
  const { name, description } = profile.getUserInfo();
  popupEdit.setInputValues({
    'profile-name': name,
    'profile-description': description,
  });
  popupEdit.open();
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

/** Включить валидацию */
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
