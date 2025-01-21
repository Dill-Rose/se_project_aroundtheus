import FormValidator from "./FormValidator.js";
import Card from "./Card.js";
import PopupWithForm from "./PopupWithForm.js";
import PopupWithImage from "./PopupWithImage.js";
import Section from "./Section.js";
import UserInfo from "./UserInfo.js";
import "../pages/index.css";
import { initialCards } from "../utils/constants.js";

import {
  profileEditModal,
  profileEditForm,
  cardListEl,
  addCardModal,
  addCardForm,
  previewImageModal,
  modalEdit,
  profileModalClose,
  profileTitle,
  profileDescription,
  addCardBtn,
  addCardModalClose,
  previewImageModalClose,
  previewImage,
  previewTitle,
  profileTitleInput,
  profileDescriptionInput,
  cardTitleInput,
  cardUrlInput,
} from "../utils/constants.js";
import { data } from "autoprefixer";

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
  imagePopup.open(data);
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

function handleProfileSubmit(inputValues) {
  console.log(inputValues);
  profileTitle.textContent = profileTitleInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  editProfilePopup.close();
}

function handleAddNewCardSubmit(inputValues) {
  console.log(inputValues);
  const name = cardTitleInput.value;
  const link = cardUrlInput.value;
  renderCard({ name, link }, cardListEl);
  addCardPopup.close();
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

modalEdit.addEventListener("click", () => {
  const currentUserInfo = userInfo.getUserInfo();
  profileTitleInput.value = currentUserInfo.name;
  profileDescriptionInput.value = currentUserInfo.description;
  editProfilePopup.open();
});
addCardBtn.addEventListener("click", () => addCardPopup.open());

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

/**Instances**/

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
  "#profile-edit-modal",
  handleProfileSubmit
);

editProfilePopup.setEventListeners();

const addCardPopup = new PopupWithForm(
  "#add-card-modal",
  handleAddNewCardSubmit
);

addCardPopup.setEventListeners();

const cardSection = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const cardEl = createCard(item);
      cardSection.addItem(cardEl);
    },
  },
  ".cards__list"
);

const imagePopup = new PopupWithImage({
  popupSelector: "#preview-image-modal",
});

imagePopup.setEventListeners();

const userInfo = new UserInfo({
  nameElement: ".profile__title",
  jobElement: ".profile__description",
});
