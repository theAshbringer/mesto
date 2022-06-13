// Кнопки
let editButton = document.querySelector(".edit-btn");
let closeButton = document.querySelector(".close-btn");
// Попап с оверлеем
let popup = document.querySelector(".popup");
// Имя и описания в профиле
let profileName = document.querySelector(".profile__name");
let profileDescription = document.querySelector(".profile__description");
// Форма и ее поля
let editForm = document.querySelector(".popup__container");
let nameFormField = document.querySelector(".popup__name");
let descriptionFormField = document.querySelector(".popup__description");

/** Инициализировать поля формы значениями из профиля */
function initFormFields() {
  nameFormField.value = profileName.innerText;
  descriptionFormField.value = profileDescription.innerText;
}

/** Открыть форму */
function openEditForm() {
  popup.classList.add("popup_opened");
  initFormFields();
}

/** Закрыть форму */
function closeEditForm() {
  popup.classList.remove("popup_opened");
}

/** Скопировать введенные данные в профиль */
function updateProfile() {
  profileNameTextNode = profileName.childNodes[0];
  profileNameTextNode.nodeValue = nameFormField.value;
  profileDescription.innerText = descriptionFormField.value;
}

/** Сохранить форму */
function saveEditForm(evt) {
  evt.preventDefault();
  updateProfile();
  closeEditForm();
}

// Событие "Редактировать профиль"
editButton.addEventListener("click", openEditForm);
// Событие "Закрыть попап"
closeButton.addEventListener("click", closeEditForm);
// Событие "Сохранить форму"
editForm.addEventListener("submit", saveEditForm);
