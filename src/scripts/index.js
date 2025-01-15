import FormValidator from "./FormValidator.js";
import Card from "./Card.js";
import PopupWithForm from "./PopupWithForm.js";
import PopupWithImage from "./PopupWithImage.js";
import Section from "./Section.js";
import UserInfo from "./UserInfo.js";
import "../pages/index.css";
import { initialCards } from "../utils/constants.js";

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
const previewImage = previewImageModal.querySelector(".modal__image");
const previewTitle = previewImageModal.querySelector(".modal__title");

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
  modal.addEventListener("mousedown", handleModalOverlay);
  document.addEventListener("keydown", handleEscKeyPress);
}

function closeModal(modal) {
  modal.classList.remove("modal_opened");
  modal.removeEventListener("mousedown", handleModalOverlay);
  document.removeEventListener("keydown", handleEscKeyPress);
}

function handleImageClick(data) {
  previewImage.src = data.link;
  previewImage.alt = data.name;
  previewTitle.textContent = data.name;
  openModal(previewImageModal);
}

function createCard(data) {
  const card = new Card(data, "#card-template", handleImageClick);
  return card.getView();
}

function renderCard(data, wrapper) {
  const cardElement = createCard(data);
  wrapper.prepend(cardElement);
}

function handleModalOverlay(e) {
  if (e.target.classList.contains("modal_opened")) {
    closeModal(e.target);
  }
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
  const name = cardTitleInput.value;
  const link = cardUrlInput.value;
  renderCard({ name, link }, cardListEl);
  closeModal(addCardModal);
  addCardForm.reset();
  addCardFormValidator.disableSubmitButton();
}

function handleEscKeyPress(evt) {
  if (evt.key === "Escape") {
    const openedModal = document.querySelector(".modal_opened");
    if (openedModal) {
      closeModal(openedModal);
    }
  }
}

/**Event Listeners**/

//profileEditForm.addEventListener("submit", handleProfileSubmit);
//addCardForm.addEventListener("submit", handleAddNewCardSubmit);
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

const formValidationSettings = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

const addCardFormValidator = new FormValidator(
  formValidationSettings,
  addCardForm
);

const editCardFormValidator = new FormValidator(
  formValidationSettings,
  profileEditForm
);

addCardFormValidator.enableValidation();
editCardFormValidator.enableValidation();

const editProfilePopup = new PopupWithForm(
  {
    popupSelector: "#profile-edit-modal",
  },
  handleProfileSubmit
);

editProfilePopup.setEventListeners();

const addCardPopup = new PopupWithForm(
  {
    popupSelector: "#add-card-modal",
  },
  handleAddNewCardSubmit
);

addCardPopup.setEventListeners();

const cardSection = new Section(
  {
    renderer: (item) => {
      const cardEl = createCard(item);
      cardSection.addItem(cardEl);
    },
  },
  "cards__list"
);

const imagePopup = new PopupWithImage({ popupSelector: ".modal__image" });

imagePopup.setEventListeners();

const usersInfo = new UserInfo({
  nameElement: "#profile-title-input",
  jobElement: "#profile-description-input",
});
