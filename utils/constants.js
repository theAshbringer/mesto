// Кнопки
const btnAdd = document.querySelector('.add-btn');
const btnEdit = document.querySelector('.edit-btn');

// Поля форм
const nameField = document.querySelector('.popup__field_type_name');
const descriptionField = document.querySelector(
  '.popup__field_type_description'
);

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

export {
  btnAdd,
  btnEdit,
  nameField,
  descriptionField,
  cardListSelector,
  cardTemplateSelector,
  initialCards,
};
