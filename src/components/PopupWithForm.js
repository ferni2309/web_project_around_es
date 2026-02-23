import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._form = this._popup.querySelector(".form");
    this._inputList = this._form.querySelectorAll(".form__input");
    this._submitButton = this._form.querySelector(".popup__button");
    this._submitButtonText = this._submitButton.textContent;
  }

  _getInputValues() {
    const formValues = {};
    this._inputList.forEach((input) => {
      formValues[input.id] = input.value;
    });
    return formValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
    });
  }

  renderLoading(isLoading) {
    if (isLoading) {
      this._submitButton.textContent = "Guardando...";
    } else {
      this._submitButton.textContent = this._submitButtonText;
    }
  }

  close() {
    super.close();
    this._form.reset();
    const errorElements = this._form.querySelectorAll(".form__input-error");
    errorElements.forEach((errorElement) => {
      errorElement.textContent = "";
      errorElement.classList.remove("popup__error_visible");
    });
    if (this._submitButton) {
      this._submitButton.disabled = true;
    }
  }
}