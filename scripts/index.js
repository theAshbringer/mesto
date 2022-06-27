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
const closeButton = document.querySelector('.close-btn');
// Попап с оверлеем
const popup = document.querySelector('.popup');
// Имя и описания в профиле
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');
// Форма и ее поля
const formElement = document.querySelector('.popup__container');
const nameInput = document.querySelector('.popup__field_type_name');
const jobInput = document.querySelector('.popup__field_type_description');

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

/** Инициализировать поля формы значениями из профиля */
function initFormFields() {
  nameInput.value = profileName.innerText;
  jobInput.value = profileDescription.innerText;
}

/** Открыть форму */
function openForm() {
  popup.classList.add('popup_opened');
  initFormFields();
}

/** Закрыть форму */
function closeForm() {
  popup.classList.remove('popup_opened');
}

/** Скопировать введенные данные в профиль */
function updateProfile() {
  profileName.innerText = nameInput.value;
  profileDescription.innerText = jobInput.value;
}

/** Сохранить форму */
function formSubmitHandler(evt) {
  evt.preventDefault();
  updateProfile();
  closeForm();
}

// Событие "Редактировать профиль"
editButton.addEventListener('click', openForm);
// Событие "Закрыть попап"
closeButton.addEventListener('click', closeForm);
// Событие "Сохранить форму"
formElement.addEventListener('submit', formSubmitHandler);

initializeCards();
