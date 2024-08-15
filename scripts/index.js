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

const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;

/** Wrappers */
const profileEditModal = document.querySelector("#profile-edit-modal");
const profileEditForm = profileEditModal.querySelector(".modal__form");
const cardListEl = document.querySelector(".cards__list");
const addCardModal = document.querySelector("#add-card-modal");
const addCardForm = addCardModal.querySelector(".modal__form");
const previewImageModal = document.querySelector("#preview-image-modal");

/** Buttons and other DOM */
const modalEdit = document.querySelector("#profile-edit-button");
const profileModalClose = profileEditModal.querySelector("#modal-close-button");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");

const addCardBtn = document.querySelector("#profile-add-button");
const addCardModalClose = addCardModal.querySelector("#modal-close-button");
const previewImageModalClose = previewImageModal.querySelector(
  "#modal-close-button"
);

/** Form data */
const profileTitleInput = document.querySelector("#profile-title-input");
const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);
const cardTitleInput = addCardForm.querySelector("#card-title-input");
const cardUrlInput = addCardForm.querySelector("#image-url-input");

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
  let cardLikeButton = cardElement.querySelector(".card__like-button");
  let cardDeleteButton = cardElement.querySelector(".card__delete-button");
  cardDeleteButton.addEventListener("click", () => {
    cardElement.remove();
  });

  cardImageEl.addEventListener("click", () => {
    let previewImage = previewImageModal.querySelector(".modal__image");
    let previewTitle = previewImageModal.querySelector(".modal__title");
    previewImage.src = data.link;
    previewImage.alt = data.name;
    previewTitle.textContent = data.name;
    openModal(previewImageModal);
  });

  cardLikeButton.addEventListener("click", () => {
    cardLikeButton.classList.toggle("card__like-button_active");
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
  addCardForm.reset();
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
previewImageModalClose.addEventListener("click", () =>
  closeModal(previewImageModal)
);
/**Loops**/

initialCards.forEach((data) => renderCard(data, cardListEl));
