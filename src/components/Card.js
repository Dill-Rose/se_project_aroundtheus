export default class Card {
  constructor(
    data,
    cardSelector,
    handleImageClick,
    handleDeleteClick,
    handleLikeClick
  ) {
    this._id = data._id;
    this._name = data.name;
    this._link = data.link;
    this._isLiked = data.isLiked;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
    this._handleDeleteClick = handleDeleteClick;
    this._handleLikeClick = handleLikeClick;
  }

  _setEventListeners() {
    this._cardElement
      .querySelector(".card__like-button")
      .addEventListener("click", () => {
        this._handleLikeClick(evt, this._id);
      });
    this._cardElement
      .querySelector(".card__delete-button")
      .addEventListener("click", () => {
        this._handleDeleteClick(this._id, this);
      });
    this._cardImage.addEventListener("click", () => {
      this._handleImageClick({ link: this._link, name: this._name });
    });
  }

  remove() {
    this._cardElement.remove();
  }

  isLiked() {
    return this._isLiked;
  }

  getId() {
    return this._id;
  }

  _updateLikesView() {
    if (this.isLiked()) {
      this._likeButton.classList.add("card__like-button_active");
    } else {
      this._likeButton.classList.remove("card__like-button_active");
    }
  }

  updateLikesView() {
    this._likeButton.classList.toggle("card__like-button_active");
  }

  // _handleLikeIcon() {
  //   this._cardElement
  //     .querySelector(".card__like-button")
  //     .classList.toggle("card__like-button_active");
  // }

  getView() {
    this._cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);
    this._cardImage = this._cardElement.querySelector(".card__image");
    this._cardTitle = this._cardElement.querySelector(".card__title");
    this._likeButton = this._cardElement.querySelector(".card__like-button");

    this._updateLikesView();

    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._cardTitle.textContent = this._name;

    this._setEventListeners();
    return this._cardElement;
  }
}
