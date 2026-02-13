export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  open() {
    this._popup.classList.add("popup--show");
    document.addEventListener("keydown", this._handleEscClose);


    const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = "hidden";
    document.body.style.paddingRight = `${scrollBarWidth}px`;
  }

  close() {
    this._popup.classList.remove("popup--show");
    document.removeEventListener("keydown", this._handleEscClose);


    document.body.style.overflow = "";
    document.body.style.paddingRight = "";
  }

  _handleEscClose(evt) {
    if (evt.key === "Escape") {
      this.close();
    }
  }

  setEventListeners() {

    const closeButton = this._popup.querySelector(".popup__close, .image-popup__close");
    if (closeButton) {
      closeButton.addEventListener("click", () => this.close());
    }


    this._popup.addEventListener("mousedown", (evt) => {
      if (evt.target === this._popup) {
        this.close();
      }
    });


    const overlay = this._popup.querySelector(".image-popup__overlay");
    if (overlay) {
      overlay.addEventListener("click", () => this.close());
    }
  }
}