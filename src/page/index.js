import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import Api from "../components/Api.js";
import PopupWithConfirmation from "../components/PopupWithConfirmation.js";

const confirmPopup = new PopupWithConfirmation("#confirm-popup");
confirmPopup.setEventListeners();

const api = new Api({
  baseUrl: "https://around-api.es.tripleten-services.com/v1",
  headers: {
    authorization: "98d178e2-4bc1-405e-af44-da35273fb2e3",
    "Content-Type": "application/json",
  },
});

const userInfo = new UserInfo({
  nameSelector: "#profileName",
  jobSelector: "#profileAcerca",
});

const imagePopup = new PopupWithImage("#image-popup");
imagePopup.setEventListeners();

const handleCardClick = (data) => {
  imagePopup.open(data);
};

const cardSection = new Section(
  {
    items: [],
    renderer: (item) => {
      const card = new Card(
        item,
        "#card-template",
        handleCardClick,
        confirmPopup,
        api
      );
      const cardElement = card.generateCard();
      cardSection.addItem(cardElement);
    },
  },
  ".elements"
);

Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([userData, cards]) => {
    userInfo.setUserInfo({ name: userData.name, job: userData.about });
    const avatarImg = document.querySelector(".profile__imagen");
    avatarImg.src = userData.avatar;
    const currentUserId = userData._id;
    cards.forEach((item) => {
      const card = new Card(
        item,
        "#card-template",
        handleCardClick,
        confirmPopup,
        api,
        currentUserId
      );
      const cardElement = card.generateCard();
      cardSection.addItem(cardElement);
    });
  })
  .catch((err) => console.log(err));

const validationConfig = {
  inputSelector: ".form__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

let currentAction = "";
const popupForm = new PopupWithForm("#popup", (formData) => {
  if (currentAction === "edit") {
    popupForm.renderLoading(true);
    api.updateUserInfo({
      name: formData.input1,
      about: formData.input2,
    })
      .then((updatedUser) => {
        userInfo.setUserInfo({
          name: updatedUser.name,
          job: updatedUser.about,
        });
        popupForm.close();
      })
      .catch((err) => console.log(err))
      .finally(() => popupForm.renderLoading(false));
  } else if (currentAction === "add") {
    if (!formData.input2.startsWith("http")) {
      alert("Por favor ingresa un enlace válido que empiece con http o https");
      return;
    }
    popupForm.renderLoading(true);
    api.addCard({ name: formData.input1, link: formData.input2 })
      .then((newCardData) => {
        const newCard = new Card(
          newCardData,
          "#card-template",
          handleCardClick,
          confirmPopup,
          api
        );
        const cardElement = newCard.generateCard();
        cardSection.addItem(cardElement);
        popupForm.close();
      })
      .catch((err) => console.log(err))
      .finally(() => popupForm.renderLoading(false));
  }
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

const avatarPopup = new PopupWithForm("#avatar-popup", (formData) => {
  const avatarUrl = formData["avatar-input"];

  if (!avatarUrl || !/^https?:\/\//.test(avatarUrl)) {
    alert("Por favor ingresa un enlace válido que empiece con http o https");
    return;
  }

  avatarPopup.renderLoading(true);
  api.updateAvatar(avatarUrl)
    .then((updatedUser) => {
      const avatarImg = document.querySelector(".profile__imagen");
      avatarImg.src = updatedUser.avatar;
      avatarPopup.close();
    })
    .catch((err) => console.log(err))
    .finally(() => avatarPopup.renderLoading(false));
});
avatarPopup.setEventListeners();

const editAvatarButton = document.querySelector(".profile__EditAvatar");
editAvatarButton.addEventListener("click", () => {
  avatarPopup.open();
});