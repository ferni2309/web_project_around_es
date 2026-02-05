import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import { cerrarPopupImagen } from "../scripts/utils.js";

const cardsContainer = document.querySelector(".elements");
const formElement = document.querySelector(".form");
const profileName = document.getElementById("profileName");
const profileAcerca = document.getElementById("profileAcerca");
const editButton = document.querySelector(".profile__EditButton");
const addButton = document.querySelector(".profile__AddButton");
const guardarButton = document.getElementById("guardar");
const popup = document.getElementById("popup");
const popupTitle = document.getElementById("popup-title");
const input1 = document.getElementById("input1");
const input2 = document.getElementById("input2");
const closeButton = document.getElementById("popup-close");

let currentAction = "";

const initialCards = [
  {
    name: "Valle de Yosemite",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/yosemite.jpg",
  },
  {
    name: "Lago Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/lake-louise.jpg",
  },
  {
    name: "Montañas Calvas",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/latemar.jpg",
  },
  {
    name: "Parque Nacional de la Vanoise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/lago.jpg",
  },
];

initialCards.forEach((data) => {
  const card = new Card(data, "#card-template");
  const cardElement = card.generateCard();
  cardsContainer.prepend(cardElement);
});

const validator = new FormValidator(
  {
    formSelector: ".form",
    inputSelector: ".form__input",
    submitButtonSelector: ".popup__button",
    inactiveButtonClass: "popup__button_disabled",
    inputErrorClass: "popup__input_type_error",
    errorClass: "popup__error_visible",
  },
  formElement,
);
validator.enableValidation();

function abrirPopup(button) {
  popup.classList.add("popup--show");

  currentAction = button.classList.contains("profile__EditButton")
    ? "edit"
    : "add";

  popupTitle.textContent = button.getAttribute("data-title");
  input1.value = "";
  input2.value = "";
  input1.placeholder = button.getAttribute("data-placeholder1");
  input2.placeholder = button.getAttribute("data-placeholder2");

  guardarButton.textContent = currentAction === "edit" ? "Guardar" : "Crear";
}

function cerrarPopupFormulario() {
  popup.classList.remove("popup--show");
}

guardarButton.addEventListener("click", (e) => {
  e.preventDefault();
  const val1 = input1.value.trim();
  const val2 = input2.value.trim();

  if (currentAction === "edit") {
    profileName.textContent = val1;
    profileAcerca.textContent = val2;
  } else if (currentAction === "add") {
    const card = new Card({ name: val1, link: val2 }, "#card-template");
    const cardElement = card.generateCard();
    cardsContainer.prepend(cardElement);
  }

  cerrarPopupFormulario();
});

editButton.addEventListener("click", () => abrirPopup(editButton));
addButton.addEventListener("click", () => abrirPopup(addButton));
closeButton.addEventListener("click", cerrarPopupFormulario);

document
  .getElementById("image-popup-close")
  .addEventListener("click", cerrarPopupImagen);
document
  .getElementById("image-popup-overlay")
  .addEventListener("click", cerrarPopupImagen);
