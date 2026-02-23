export default class Card {
  constructor(data, cardSelector, handleCardClick, confirmPopup, api, currentUserId) {
  this._name = data.name;
  this._link = data.link;
  this._id = data._id;
  this._isLiked = data.isLiked;
  this._ownerId = data.owner;
  this._cardSelector = cardSelector;
  this._handleCardClick = handleCardClick;
  this._confirmPopup = confirmPopup;
  this._api = api;
  this._currentUserId = currentUserId;
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
      this._confirmPopup.setSubmitAction(() => {
        this._api.deleteCard(this._id)
          .then(() => {
            card.remove();
            this._confirmPopup.close();
          })
          .catch((err) => console.log(err));
      });
      this._confirmPopup.open();
    });

    heart.addEventListener("click", () => {
  if (!heart.classList.contains("liked")) {
    this._api.likeCard(this._id)
      .then((updatedCard) => {
        heart.classList.add("liked");
        heart.src = "./src/images/Group-corazón-Active.svg";
        this._isLiked = updatedCard.isLiked;
      })
      .catch((err) => console.log(err));
  } else {
    this._api.unlikeCard(this._id)
      .then((updatedCard) => {
        heart.classList.remove("liked");
        heart.src = "./src/images/Group-corazón.svg";
        this._isLiked = updatedCard.isLiked;
      })
      .catch((err) => console.log(err));
  }
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
  const heart = card.querySelector(".group__imagen");
  const deleteBtn = card.querySelector(".elements__delete");

  image.src = this._link;
  image.alt = this._name;
  title.textContent = this._name;


  if (this._isLiked) {
  heart.classList.add("liked");
  heart.src = "./src/images/Group-corazón-Active.svg";
} else {
  heart.classList.remove("liked");
  heart.src = "./src/images/Group-corazón.svg";
}


  if (this._ownerId !== this._currentUserId) {
    deleteBtn.style.display = "none";
  }

  this._setEventListeners(card);

  return card;
}

}