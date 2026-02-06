import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";

const validationConfig = {
  inputSelector: ".form__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

const initialCards = [
  { name: "Valle de Yosemite", link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/yosemite.jpg" },
  { name: "Lago Louise", link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/lake-louise.jpg" },
  { name: "Montañas Calvas", link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/bald-mountains.jpg" },
  { name: "Latemar", link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/latemar.jpg" },
  { name: "Parque Nacional de la Vanoise", link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/vanoise.jpg" },
  { name: "Lago di Braies", link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/lago.jpg" },
];


const imagePopup = new PopupWithImage("#image-popup");
imagePopup.setEventListeners();

const handleCardClick = (data) => {
  imagePopup.open(data);
};


const cardSection = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const card = new Card(item, "#card-template", handleCardClick);
      const cardElement = card.generateCard();
      cardSection.addItem(cardElement);
    },
  },
  ".elements"
);
cardSection.renderItems();


const userInfo = new UserInfo({
  nameSelector: "#profileName",
  jobSelector: "#profileAcerca",
});


let currentAction = "";


const popupForm = new PopupWithForm("#popup", (formData) => {
  if (currentAction === "edit") {
    userInfo.setUserInfo({
      name: formData.input1,
      job: formData.input2,
    });
  } else if (currentAction === "add") {

    if (!formData.input2.startsWith("http")) {
      alert("Por favor ingresa un enlace válido que empiece con http o https");
      return;
    }
    const newCard = new Card(
      { name: formData.input1, link: formData.input2 },
      "#card-template",
      handleCardClick
    );
    const cardElement = newCard.generateCard();
    cardSection.addItem(cardElement);
  }
  popupForm.close();
});
popupForm.setEventListeners();


const formElement = document.querySelector("#popup .form");
const formValidator = new FormValidator(validationConfig, formElement);
formValidator.enableValidation();


const popupTitle = document.getElementById("popup-title");
const input1 = document.getElementById("input1");
const input2 = document.getElementById("input2");


const editButton = document.querySelector(".profile__EditButton");
editButton.addEventListener("click", () => {
  currentAction = "edit";

  input1.value = "";
  input2.value = "";


  input1.type = "text";
  input2.type = "text";

  input1.placeholder = editButton.getAttribute("data-placeholder1");
  input2.placeholder = editButton.getAttribute("data-placeholder2");

  popupTitle.textContent = editButton.getAttribute("data-title");

  popupForm.open();
});


const addButton = document.querySelector(".profile__AddButton");
addButton.addEventListener("click", () => {
  currentAction = "add";

  input1.value = "";
  input2.value = "";


  input1.type = "text";
  input2.type = "url";

  input1.placeholder = addButton.getAttribute("data-placeholder1");
  input2.placeholder = addButton.getAttribute("data-placeholder2");

  popupTitle.textContent = addButton.getAttribute("data-title");

  popupForm.open();
});