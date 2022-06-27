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

const editForm = {
  formClass: '.edit-profile',
  topInput: '.popup__field_type_name',
  bottomInput: '.popup__field_type_description',
  topInputInitValue: '.profile__name',
  bottomInputInitValue: '.profile__description',
};
editFormElement = document.querySelector(editForm.formClass);

const addForm = {
  formClass: '.add-card',
  topInput: '.popup__field_type_card-name',
  bottomInput: '.popup__field_type_card-link',
};
addFormElement = document.querySelector(addForm.formClass);

/** Отрисовать карточку */
const renderCard = (name, link) => {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  cardElement.querySelector('.card__title').textContent = name;
  cardElement.querySelector('.card__photo').src = link;

  const listItem = document.createElement('li');
  listItem.append(cardElement);
  const cardList = document.querySelector('.cards');
  cardList.append(listItem);
};

/** Отобразить начальные карточки при загрузке страницы */
const initializeCards = () => {
  initialCards.forEach((item) => renderCard(item.name, item.link));
};

/** Инициализировать полt формы значениями из профиля */
function initFormField(form, sourceElementCls, targetElementCls) {
  const sourceElement = document.querySelector(sourceElementCls);
  const targetElement = document.querySelector(targetElementCls);
  targetElement.value = sourceElement.innerText;
}

/** Открыть форму */
function openForm(form) {
  const formElement = document.querySelector(form.formClass);
  formElement.closest('.popup').classList.add('popup_opened');
  if (form.topInputInitValue) {
    initFormField(form, form.topInputInitValue, form.topInput);
  }
  if (form.bottomInputInitValue) {
    initFormField(form, form.bottomInputInitValue, form.bottomInput);
  }
}

/** Закрыть форму */
function closeForm(form) {
  const formElement = document.querySelector(form.formClass);
  formElement.closest('.popup').classList.remove('popup_opened');
}

/** Получить содержимое полей формы */
const getInputValues = (form) => {
  const formElement = document.querySelector(form.formClass);
  const topInput = formElement.querySelector(form.topInput);
  const bottomInput = formElement.querySelector(form.bottomInput);
  return [topInput, bottomInput];
};

/** Скопировать введенные данные в профиль */
function updateProfile(name, job) {
  const profileName = document.querySelector('.profile__name');
  const profileDescription = document.querySelector('.profile__description');
  profileName.innerText = name;
  profileDescription.innerText = job;
}

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
editButton.addEventListener('click', () => openForm(editForm));
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
