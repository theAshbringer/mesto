// Кнопки
const editButton = document.querySelector(".edit-btn");
const closeButton = document.querySelector(".close-btn");
// Попап с оверлеем
const popup = document.querySelector(".popup");
// Имя и описания в профиле
const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");
// Форма и ее поля
const formElement = document.querySelector(".popup__container");
const nameInput = document.querySelector(".popup__field_type_name");
const jobInput = document.querySelector(".popup__field_type_description");

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
editButton.addEventListener("click", openForm);
// Событие "Закрыть попап"
closeButton.addEventListener("click", closeForm);
// Событие "Сохранить форму"
formElement.addEventListener("submit", formSubmitHandler);
