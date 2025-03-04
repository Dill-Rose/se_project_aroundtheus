export const initialCards = [
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

export const formValidationSettings = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

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

export {
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
};
