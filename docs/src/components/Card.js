export default class Card {
  constructor(data, cardSelector, handleCardClick) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
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

    deleteBtn.addEventListener("click", () => {
      card.remove();
    });

    heart.addEventListener("click", () => {
      const isLiked = heart.classList.toggle("liked");
      heart.src = isLiked
        ? "/web_project_around_es/images/Group-corazón-Active.svg"
        : "/web_project_around_es/images/Group-corazón.svg";
    });

    image.addEventListener("click", () => {
      this._handleCardClick({ link: this._link, name: this._name });
    });
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