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

// Кнопки
const editButton = document.querySelector('.edit-btn');
const addButton = document.querySelector('.add-btn');
const editFormCloseButton = document.querySelector('.edit-profile .close-btn');
const addFormCloseButton = document.querySelector('.add-card .close-btn');

const cardTemplate = document.querySelector('#card-template').content;

// Попап с оверлеем
const popup = document.querySelector('.popup');

// Попап с картинкой
const imgPopup = document.querySelector('.img-popup');

const editForm = {
  formClass: '.edit-profile',
  topInput: '.popup__field_type_name',
  bottomInput: '.popup__field_type_description',
  topInputInitValue: '.profile__name',
  bottomInputInitValue: '.profile__description',
};
const editFormElement = document.querySelector(editForm.formClass);

const addForm = {
  formClass: '.add-card',
  topInput: '.popup__field_type_card-name',
  bottomInput: '.popup__field_type_card-link',
};
const addFormElement = document.querySelector(addForm.formClass);

// Обработчик кнопок удаления
const deleteButtonHandler = (evt) => {
  evt.target.closest('li').remove();
};

const openPopup = (popup_container) => {
  popup_container.closest('.popup').classList.add('popup_opened');
};

const closePopup = (popup_container) => {
  popup_container.closest('.popup').classList.remove('popup_opened');
};

const passCardToPopup = (cardElement) => {
  cardImage = cardElement.querySelector('.card__photo');
  cardTitle = cardElement.querySelector('.card__title');
  document.querySelector('.img-popup__image').src = cardImage.src;
  document.querySelector('.img-popup__title').textContent =
    cardTitle.textContent;
};

// Закрытие попапа
const closeImgPopupButton = document.querySelector('.img-popup__close');
closeImgPopupButton.addEventListener('click', () => closePopup(imgPopup));

// Обработчик кнопок открытия картинки
const imageButtonHandler = (evt) => {
  openPopup(imgPopup);
  const currentCard = evt.target.closest('.card');
  passCardToPopup(currentCard);
};

// Обработчик лайков
const likeButtonHandler = (evt) => {
  evt.target.classList.toggle('like-btn_active');
};

/** Отрисовать карточку */
const renderCard = (name, link) => {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  cardElement.querySelector('.card__title').textContent = name;
  cardElement.querySelector('.card__photo').src = link;

  const listItem = document.createElement('li');
  listItem.append(cardElement);
  const cardList = document.querySelector('.cards');
  cardList.append(listItem);

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

/** Инициализировать поля формы редактирования профиля */
const initFormField = (sourceElementCls, targetElementCls) => {
  const sourceElement = document.querySelector(sourceElementCls);
  const targetElement = document.querySelector(targetElementCls);
  targetElement.value = sourceElement.innerText;
};

/** Закрыть форму */
const closeForm = (form) => {
  const formElement = document.querySelector(form.formClass);
  formElement.closest('.popup').classList.remove('popup_opened');
};

/** Получить содержимое полей формы */
const getInputValues = (form) => {
  const formElement = document.querySelector(form.formClass);
  const topInput = formElement.querySelector(form.topInput);
  const bottomInput = formElement.querySelector(form.bottomInput);
  return [topInput, bottomInput];
};

/** Скопировать введенные данные в профиль */
const updateProfile = (name, job) => {
  const profileName = document.querySelector('.profile__name');
  const profileDescription = document.querySelector('.profile__description');
  profileName.innerText = name;
  profileDescription.innerText = job;
};

/** Очистить форму */
const clearForm = (topField, bottomField) => {
  topField.value = '';
  bottomField.value = '';
};
/** Обработчик отправки формы редактирования профиля */
const editFormSubmitHandler = (evt) => {
  evt.preventDefault();
  [profileName, profileJob] = getInputValues(editForm);
  updateProfile(profileName.value, profileJob.value);
  closeForm(editForm);
};

/** Обработчик отправки формы добавления карточки */
const addFormSubmitHandler = (evt) => {
  evt.preventDefault();
  [cardName, cardLink] = getInputValues(addForm);
  renderCard(cardName.value, cardLink.value);
  clearForm(cardName, cardLink);
  closeForm(addForm);
};

initializeCards();
// Событие "Редактировать профиль"
editButton.addEventListener('click', () => {
  openPopup(editFormElement);
  initFormField(editForm.topInputInitValue, editForm.topInput);
  initFormField(editForm.bottomInputInitValue, editForm.bottomInput);
});
// Событие "Закрыть форму редактирования профиля"
editFormCloseButton.addEventListener('click', () => closeForm(editForm));
// Событие "Добавить карточку"
addButton.addEventListener('click', () => openForm(addForm));
// Событие "Закрыть форму добавления карточки"
addFormCloseButton.addEventListener('click', () => closeForm(addForm));
// Событие "Сохранить форму"
editFormElement.addEventListener('submit', editFormSubmitHandler);
// Событие "Сохранить форму"
addFormElement.addEventListener('submit', addFormSubmitHandler);
