export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  open() {
    this._popup.classList.add("popup--show");
    document.addEventListener("keydown", this._handleEscClose);

    // Bloquear scroll y compensar ancho de la barra
    const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = "hidden";
    document.body.style.paddingRight = `${scrollBarWidth}px`;
  }

  close() {
    this._popup.classList.remove("popup--show");
    document.removeEventListener("keydown", this._handleEscClose);

    // Restaurar scroll y padding
    document.body.style.overflow = "";
    document.body.style.paddingRight = "";
  }

  _handleEscClose(evt) {
    if (evt.key === "Escape") {
      this.close();
    }
  }

  setEventListeners() {
    // Buscar botón de cerrar en cualquiera de los dos tipos de popup
    const closeButton = this._popup.querySelector(".popup__close, .image-popup__close");
    if (closeButton) {
      closeButton.addEventListener("click", () => this.close());
    }

    // Cerrar si haces clic en el overlay (fondo)
    this._popup.addEventListener("mousedown", (evt) => {
      if (evt.target === this._popup) {
        this.close();
      }
    });
  }
}