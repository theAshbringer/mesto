// Кнопки
const editButton = document.querySelector('.edit-btn');
const addButton = document.querySelector('.add-btn');
const editFormCloseButton = document.querySelector('.edit-profile .close-btn');
const addFormCloseButton = document.querySelector('.add-card .close-btn');
const closeImgPopupButton = document.querySelector('.img-popup__close');

// Шаблон карточки
const cardTemplate = document.querySelector('#card-template').content;

// Элемент карточки в шаблоне
const cardElement = cardTemplate.querySelector('.card');

// Попапы
const popupEdit = document.querySelector('.popup_type_edit');
const popupAdd = document.querySelector('.popup_type_add');
const popupImg = document.querySelector('.popup_type_img');

// Контейнеры попапов
const editFormElement = document.querySelector('.edit-profile');
const addFormElement = document.querySelector('.add-card');
const imgPopup = document.querySelector('.img-popup');

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

// Элементы попапа с картинкой
const imgPopupTitle = document.querySelector('.img-popup__title');
const imgPopupPic = document.querySelector('.img-popup__image');

const deleteButtonHandler = (evt) => {
  evt.target.closest('.card').remove();
};

const openPopup = (popup) => {
  popup.classList.add('popup_opened');
};

const closePopup = (popup) => {
  popup.classList.remove('popup_opened');
};

/** Показать картинку в попапе */
const showImage = (title, image) => {
  imgPopupPic.alt = title.textContent;
  imgPopupTitle.textContent = title.textContent;
  imgPopupPic.src = image.src;
  openPopup(popupImg);
};

const likeButtonHandler = (evt) => {
  evt.target.classList.toggle('like-btn_active');
};

/** Создать карточку */
const createCard = (name, link) => {
  const card = cardElement.cloneNode(true);
  card.querySelector('.card__photo').src = link;
  card.querySelector('.card__photo').alt = name;
  card.querySelector('.card__title').textContent = name;

  card
    .querySelector('.card__delete')
    .addEventListener('click', deleteButtonHandler);

  card.querySelector('.card__onclick').addEventListener('click', (evt) => {
    currentCard = evt.target.closest('.card');
    cardImage = currentCard.querySelector('.card__photo');
    cardTitle = currentCard.querySelector('.card__title');
    showImage(cardTitle, cardImage);
  });

  card
    .querySelector('.card__like-btn')
    .addEventListener('click', likeButtonHandler);

  return card;
};

/** Отрисовать карточку */
const renderCard = (card) => {
  const cardList = document.querySelector('.cards');
  cardList.prepend(card);
};

/** Отобразить начальные карточки при загрузке страницы */
const initializeCards = () => {
  initialCards.forEach((item) => {
    const card = createCard(item.name, item.link);
    renderCard(card);
  });
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
  renderCard(createCard(cardTitleField.value, cardLinkField.value));
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

// Закрывать попапы по клику на оверлей
const popupList = document.querySelectorAll('.popup');
popupList.forEach((popup) => {
  popup.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('popup')) {
      closePopup(popup);
    }
  });
});
