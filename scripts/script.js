// Кнопки
let editButton = document.querySelector(".edit-btn");
let closeButton = document.querySelector(".close-btn");
// Попап с оверлеем
let popup = document.querySelector(".popup");
// Имя и описания в профиле
let profileName = document.querySelector(".profile__name");
let profileDescription = document.querySelector(".profile__description");
// Форма и ее поля
let formElement = document.querySelector(".popup__container");
let nameInput = document.querySelector(".popup__name");
let jobInput = document.querySelector(".popup__description");

/** Инициализировать поля формы значениями из профиля */
function initFormFields() {
  nameInput.value = profileName.innerText;
  jobInput.value = profileDescription.innerText;
}

/** Открыть форму */
function openForm() {
  popup.classList.add("popup_opened");
  initFormFields();
}

/** Закрыть форму */
function closeForm() {
  popup.classList.remove("popup_opened");
}

/** Скопировать введенные данные в профиль */
function updateProfile() {
  profileNameTextNode = profileName.childNodes[0];
  profileNameTextNode.nodeValue = nameInput.value;
  profileDescription.innerText = jobInput.value;
}

/** Сохранить форму */
function formSubmitHandler(evt) {
  evt.preventDefault();
  updateProfile();
  closeForm();
}

// Событие "Редактировать профиль"
editButton.addEventListener("click", openForm);
// Событие "Закрыть попап"
closeButton.addEventListener("click", closeForm);
// Событие "Сохранить форму"
formElement.addEventListener("submit", formSubmitHandler);
