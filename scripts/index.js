const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
  },
];

/**Templates **/

let cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;

/** Wrappers */
let profileEditModal = document.querySelector("#profile-edit-modal");
let profileEditForm = profileEditModal.querySelector(".modal__form");
let cardListEl = document.querySelector(".cards__list");
let addCardModal = document.querySelector("#add-card-modal");
let addCardForm = addCardModal.querySelector(".modal__form");

/** Buttons and other DOM */
let modalEdit = document.querySelector("#profile-edit-button");
let profileModalClose = profileEditModal.querySelector("#modal-close-button");
let profileTitle = document.querySelector(".profile__title");
let profileDescription = document.querySelector(".profile__description");

let addCardBtn = document.querySelector("#profile-add-button");
let addCardModalClose = addCardModal.querySelector("#modal-close-button");

/** Form data */
let profileTitleInput = document.querySelector("#profile-title-input");
let profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);
let cardTitleInput = addCardForm.querySelector("#card-title-input");
let cardUrlInput = addCardForm.querySelector("#image-url-input");

/**Functions**/

function openModal(modal) {
  modal.classList.add("modal_opened");
}

function closeModal(modal) {
  modal.classList.remove("modal_opened");
}

function getCardElement(data) {
  let cardElement = cardTemplate.cloneNode(true);
  let cardImageEl = cardElement.querySelector(".card__image");
  let cardTitleEl = cardElement.querySelector(".card__title");
  let cardLikeButtons = cardElement.querySelector(".card__like-button");
  // find delte button
  //add event listener to delete button
  //call cardElement.remove

  // addd click listener to cardImage elemetn
  //use openmodal pass it (previewImageModal)
  //
  cardLikeButtons.addEventListener("click", () => {
    cardLikeButtons.classList.toggle("card__like-button_active");
  });
  cardImageEl.src = data.link;
  cardImageEl.alt = data.name;
  cardTitleEl.textContent = data.name;
  return cardElement;
}

function renderCard(data, wrapper) {
  let cardElement = getCardElement(data);
  wrapper.prepend(cardElement);
}

/**Event Handlers**/

function handleProfileSubmit(e) {
  e.preventDefault();
  profileTitle.textContent = profileTitleInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  closeModal(profileEditModal);
}

function handleAddNewCardSubmit(e) {
  e.preventDefault();
  let name = cardTitleInput.value;
  let link = cardUrlInput.value;
  renderCard({ name, link }, cardListEl);
  closeModal(addCardModal);
}

/**Event Listeners**/

profileEditForm.addEventListener("submit", handleProfileSubmit);
addCardForm.addEventListener("submit", handleAddNewCardSubmit);
profileModalClose.addEventListener("click", () => closeModal(profileEditModal));
modalEdit.addEventListener("click", () => {
  profileTitleInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
  openModal(profileEditModal);
});
addCardBtn.addEventListener("click", () => openModal(addCardModal));
addCardModalClose.addEventListener("click", () => closeModal(addCardModal));

/**Loops**/

initialCards.forEach((data) => renderCard(data, cardListEl));
