export default class Card {
  constructor(data, cardSelector) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.cloneNode(true);
    return cardElement;
  }

  _setEventListeners(card) {
    const deleteBtn = card.querySelector(".elements__delete");
    const image = card.querySelector(".cards__imagen");
    const heart = card.querySelector(".group__imagen");

    if (deleteBtn) {
      deleteBtn.addEventListener("click", () => {
        card.remove();
      });
    }

    if (heart) {
      heart.addEventListener("click", () => {
        const isLiked = heart.classList.toggle("liked");
        heart.src = isLiked
          ? "./images/Group-corazón-Active.svg"
          : "./images/Group-corazón.svg";
      });
    }

    if (image) {
      image.addEventListener("click", () => {
        import("../scripts/utils.js").then(({ abrirPopupImagen }) => {
          abrirPopupImagen(image);
        });
      });
    }
  }

  generateCard() {
    const cardFragment = this._getTemplate();
    const card = cardFragment.querySelector(".cards");

    const image = card.querySelector(".cards__imagen");
    const title = card.querySelector(".group__text");

    image.src = this._link;
    image.alt = this._name;
    title.textContent = this._name;

    this._setEventListeners(card);

    return card;
  }
}
