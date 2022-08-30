import Api from '../components/Api';

const btnAdd = document.querySelector('.add-btn');
const btnEdit = document.querySelector('.edit-btn');
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

const authToken = 'b83e92bb-9e9d-4e00-bf65-d2bd8a4e2e78';

const baseUrl = 'https://mesto.nomoreparties.co/v1/cohort-49/';

const api = new Api({ baseUrl, authToken });
let myId = '';
api.get('users/me').then((res) => {
  myId = res._id;
});

export {
  btnAdd,
  btnEdit,
  cardListSelector,
  cardTemplateSelector,
  initialCards,
  authToken,
  baseUrl,
  myId,
  api,
};
