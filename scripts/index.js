const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg',
    alt: 'Заснеженные горы',
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg',
    alt: 'Незамерзшая река зимой',
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg',
    alt: 'Вид на многоэтажки с горящими окнами',
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg',
    alt: 'Горный пейзаж',
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg',
    alt: 'Железная дорога',
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg',
    alt: 'Утес на берегу Байкала',
  },
];

// Кнопки
const editButton = document.querySelector('.edit-btn');
const addButton = document.querySelector('.add-btn');
const editFormCloseButton = document.querySelector('.edit-profile .close-btn');
const addFormCloseButton = document.querySelector('.add-card .close-btn');

/** Отобразить начальные карточки при загрузке страницы */
const initializeCards = () => {
  const cardTemplate = document.querySelector('#card-template').content;

  initialCards.forEach((item) => {
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    cardElement.querySelector('.card__title').textContent = item.name;
    cardElement.querySelector('.card__link').href = item.link;
    cardElement.querySelector('.card__photo').src = item.link;
    cardElement.querySelector('.card__photo').alt = item.alt;

    const listItem = document.createElement('li');
    listItem.append(cardElement);
    const cardList = document.querySelector('.cards');
    cardList.append(listItem);
  });
};

// Попап с оверлеем
const popup = document.querySelector('.popup');

const profileEditForm = {
  formClass: '.edit-profile',
  topInput: '.popup__field_type_name',
  bottomInput: '.popup__field_type_description',
  topInputInitValue: '.profile__name',
  bottomInputInitValue: '.profile__description',
};

const addCardForm = {
  formClass: '.add-card',
  topInput: '.popup__field_type_card-name',
  bottomInput: '.popup__field_type_card-link',
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

/** Скопировать введенные данные в профиль */
function updateProfile() {
  profileName.innerText = nameInput.value;
  profileDescription.innerText = jobInput.value;
}

/** Сохранить форму */
function editFormSubmitHandler(evt) {
  evt.preventDefault();
  updateProfile();
  closeForm();
}

initializeCards();
// Событие "Редактировать профиль"
editButton.addEventListener('click', () => openForm(profileEditForm));
// Событие "Закрыть форму редактирования профиля"
editFormCloseButton.addEventListener('click', () => closeForm(profileEditForm));
// Событие "Добавить карточку"
addButton.addEventListener('click', () => openForm(addCardForm));
// Событие "Закрыть форму добавления карточки"
addFormCloseButton.addEventListener('click', () => closeForm(addCardForm));
