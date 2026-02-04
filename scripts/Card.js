export default class Card {
  constructor(data, cardSelector) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
  }

  // Obtiene el template desde el HTML
  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.cloneNode(true);
    return cardElement;
  }

  // Configura los listeners de cada tarjeta
  _setEventListeners(card) {
    const deleteBtn = card.querySelector(".elements__delete");
    const image = card.querySelector(".cards__imagen");
    const heart = card.querySelector(".group__imagen");

    // Eliminar tarjeta
    if (deleteBtn) {
      deleteBtn.addEventListener("click", () => {
        card.remove();
      });
    }

    // Like
    if (heart) {
      heart.addEventListener("click", () => {
        const isLiked = heart.classList.toggle("liked");
        heart.src = isLiked
          ? "./images/Group-corazón-Active.svg"
          : "./images/Group-corazón.svg";
      });
    }

    // Abrir popup de imagen
    if (image) {
      image.addEventListener("click", () => {
        import("./utils.js").then(({ abrirPopupImagen }) => {
          abrirPopupImagen(image);
        });
      });
    }
  }

  // Método público: devuelve la tarjeta completa
  generateCard() {
    const cardFragment = this._getTemplate();
    const card = cardFragment.querySelector(".cards"); // nodo raíz

    const image = card.querySelector(".cards__imagen");
    const title = card.querySelector(".group__text");

    image.src = this._link;
    image.alt = this._name;
    title.textContent = this._name;

    this._setEventListeners(card);

    return card;
  }
}
