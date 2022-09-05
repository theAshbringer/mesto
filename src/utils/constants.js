const btnAdd = document.querySelector('.add-btn');
const btnEdit = document.querySelector('.edit-btn');
const btnAvatar = document.querySelector('.profile__avatar-container');
const profileElement = document.querySelector('.profile');
const cardListSelector = '.cards';
const cardTemplateSelector = '#card-template';

// Данные исходных карточек
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg',
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg',
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg',
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg',
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg',
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg',
  },
];

const validationOptions = {
  formSelector: '.popup__container',
  inputSelector: '.popup__field',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__field_invalid',
  errorClass: 'popup__input-error_active',
};

const profileOptions = {
  nameSelector: '.profile__name',
  descriptionSelector: '.profile__description',
  avatarSelector: '.profile__avatar',
  activeClass: 'profile_active',
};

const cardOptions = {
  cardElementSelector: '.card',
  imageSelector: '.card__photo',
  titleSelector: '.card__title',
  likesNumberSelector: '.card__likes-number',
  likeButtonSelector: '.card__like-btn',
  activeLikeBttonClass: 'like-btn_active',
  deleteButtonSelector: '.card__delete',
  onclickSelector: '.card__onclick',
};

const authToken = 'b83e92bb-9e9d-4e00-bf65-d2bd8a4e2e78';

const baseUrl = 'https://mesto.nomoreparties.co/v1/cohort-49/';

export {
  profileElement,
  btnAdd,
  btnEdit,
  btnAvatar,
  cardListSelector,
  cardTemplateSelector,
  initialCards,
  authToken,
  baseUrl,
  validationOptions,
  profileOptions,
  cardOptions,
};
