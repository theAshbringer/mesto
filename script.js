let editButton = document.querySelector(".edit-btn");
let closeButton = document.querySelector(".close-btn");
let saveButton = document.querySelector(".save-btn");
let popup = document.querySelector(".popup");

function openPopup() {
  popup.classList.add("popup_opened");
}

function closePopup() {
  popup.classList.remove("popup_opened");
}

editButton.addEventListener("click", openPopup);
closeButton.addEventListener("click", closePopup);
