// Кнопки
const editButton = document.querySelector('.edit-btn');
const addButton = document.querySelector('.add-btn');
const editFormCloseButton = document.querySelector('.edit-profile .close-btn');
const addFormCloseButton = document.querySelector('.add-card .close-btn');
const closeImgPopupButton = document.querySelector('.img-popup__close');

// Шаблон карточки
const cardTemplate = document.querySelector('#card-template').content;

// Попапы
const popupEdit = document.querySelector('.popup_type_edit');
const popupAdd = document.querySelector('.popup_type_add');
const popupImg = document.querySelector('.popup_type_img');

// Контейнер попапа с картинкой
const imgPopup = document.querySelector('.img-popup');

// Элементы форм
const editFormElement = document.querySelector('.edit-profile');
const addFormElement = document.querySelector('.add-card');

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

const deleteButtonHandler = (evt) => {
  evt.target.closest('.card').remove();
};

const openPopup = (popup) => {
  popup.classList.add('popup_opened');
};

const closePopup = (popup) => {
  popup.classList.remove('popup_opened');
};

const passCardToPopup = (cardElement) => {
  cardImage = cardElement.querySelector('.card__photo');
  cardTitle = cardElement.querySelector('.card__title');
  document.querySelector('.img-popup__image').alt = cardTitle.textContent;
  document.querySelector('.img-popup__title').textContent =
    cardTitle.textContent;
  document.querySelector('.img-popup__image').src = cardImage.src;
};

const imageButtonHandler = (evt) => {
  const currentCard = evt.target.closest('.card');
  passCardToPopup(currentCard);
  openPopup(popupImg);
};

const likeButtonHandler = (evt) => {
  evt.target.classList.toggle('like-btn_active');
};

/** Отрисовать карточку */
const renderCard = (name, link) => {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  cardElement.querySelector('.card__photo').src = link;
  cardElement.querySelector('.card__photo').alt = name;
  cardElement.querySelector('.card__title').textContent = name;

  const cardList = document.querySelector('.cards');
  cardList.append(cardElement);

  cardElement
    .querySelector('.card__delete')
    .addEventListener('click', deleteButtonHandler);
  cardElement
    .querySelector('.card__onclick')
    .addEventListener('click', imageButtonHandler);
  cardElement
    .querySelector('.card__like-btn')
    .addEventListener('click', likeButtonHandler);
};

/** Отобразить начальные карточки при загрузке страницы */
const initializeCards = () => {
  initialCards.forEach((item) => renderCard(item.name, item.link));
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
  renderCard(cardTitleField.value, cardLinkField.value);
  addFormElement.reset();
  closePopup(popupAdd);
};

initializeCards();

// Событие "Закрыть попап с картинкой"
closeImgPopupButton.addEventListener('click', () => closePopup(popupImg));
// Событие "Редактировать профиль"
editButton.addEventListener('click', () => {
  openPopup(popupEdit);
  nameField.value = nameFieldInit.innerText;
  descriptionField.value = descriptionFieldInit.innerText;
});
// Событие "Закрыть форму редактирования профиля"
editFormCloseButton.addEventListener('click', () => closePopup(popupEdit));
// Событие "Добавить карточку"
addButton.addEventListener('click', () => openPopup(popupAdd));
// Событие "Закрыть форму добавления карточки"
addFormCloseButton.addEventListener('click', () => closePopup(popupAdd));
// Событие "Сохранить форму"
editFormElement.addEventListener('submit', editFormSubmitHandler);
// Событие "Сохранить форму"
addFormElement.addEventListener('submit', addFormSubmitHandler);
