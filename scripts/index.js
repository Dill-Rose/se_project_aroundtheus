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

/**Elements**/

let modalEdit = document.querySelector("#profile-edit-button");
let profileEditModal = document.querySelector("#profile-edit-modal");
let modalClose = document.querySelector("#modal-close-button");
let profileTitle = document.querySelector(".profile__title");
let profileDescription = document.querySelector(".profile__description");
let profileTitleInput = document.querySelector("#profile-title-input");
let profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);
let profileEditForm = profileEditModal.querySelector(".modal__form");
let cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;
let cardListEl = document.querySelector(".cards__list");
//let newCardBtn = document.querySelector()

/**Functions**/

function openModal() {
  profileTitleInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
  profileEditModal.classList.add("modal_opened");
}

function closeModal() {
  profileEditModal.classList.remove("modal_opened");
}

function getCardElement(data) {
  let cardElement = cardTemplate.cloneNode(true);
  let cardImageEl = cardElement.querySelector(".card__image");
  let cardTitleEl = cardElement.querySelector(".card__title");
  cardImageEl.src = data.link;
  cardImageEl.alt = data.name;
  cardTitleEl.textContent = data.name;
  return cardElement;
}
/**Event Handlers**/

function handleProfileSubmit(e) {
  e.preventDefault();
  profileTitle.textContent = profileTitleInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  closeModal();
}

/**Event Listeners**/

profileEditForm.addEventListener("submit", handleProfileSubmit);
modalClose.addEventListener("click", closeModal);
modalEdit.addEventListener("click", openModal);

/**Loops**/

initialCards.forEach((data) => {
  let cardElement = getCardElement(data);
  cardListEl.append(cardElement);
});
