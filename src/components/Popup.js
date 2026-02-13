export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  open() {
    this._popup.classList.add("popup--show");
    document.addEventListener("keydown", this._handleEscClose);

    // Evita que el fondo se desplace cuando el popup está abierto
    const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = "hidden";
    document.body.style.paddingRight = `${scrollBarWidth}px`;
  }

  close() {
    this._popup.classList.remove("popup--show");
    document.removeEventListener("keydown", this._handleEscClose);

    // Restaura el scroll del fondo
    document.body.style.overflow = "";
    document.body.style.paddingRight = "";
  }

  _handleEscClose(evt) {
    if (evt.key === "Escape") {
      this.close();
    }
  }

  setEventListeners() {
    // Botón de cerrar
    const closeButton = this._popup.querySelector(".popup__close, .image-popup__close");
    if (closeButton) {
      closeButton.addEventListener("click", () => this.close());
    }

    // Clic en overlay (solo si el target es el popup abierto)
    this._popup.addEventListener("mousedown", (evt) => {
      if (evt.target.classList.contains("popup--show")) {
        this.close();
      }
    });

    // Overlay específico para image-popup
    const overlay = this._popup.querySelector(".image-popup__overlay");
    if (overlay) {
      overlay.addEventListener("click", () => this.close());
    }
  }
}