import FormValidator from "../components/FormValidator.js";
import Card from "../components/Card.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import "../pages/index.css";
import { initialCards } from "../utils/constants.js";
import { formValidationSettings } from "../utils/constants.js";

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

function handleImageClick(data) {
  imagePopup.open(data);
}

function createCard(data) {
  const card = new Card(data, "#card-template", handleImageClick);
  return card.getView();
}

function renderCard(data) {
  const cardElement = createCard(data);
  cardSection.addItem(cardElement);
}

/**Event Handlers**/

function handleProfileSubmit(inputValues) {
  console.log(inputValues);
  userInfo.setUserInfo(inputValues);
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

/**Event Listeners**/

modalEdit.addEventListener("click", () => {
  const currentUserInfo = userInfo.getUserInfo();
  profileTitleInput.value = currentUserInfo.name;
  profileDescriptionInput.value = currentUserInfo.description;
  editProfilePopup.open();
});
addCardBtn.addEventListener("click", () => addCardPopup.open());

/**Loops**/

//initialCards.forEach((data) => renderCard(data, cardListEl));

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
      const cardEl = renderCard(item);
      cardSection.addItem(cardEl);
    },
  },
  ".cards__list"
);

cardSection.renderItems();

const imagePopup = new PopupWithImage({
  popupSelector: "#preview-image-modal",
});

imagePopup.setEventListeners();

const userInfo = new UserInfo({
  nameElement: ".profile__title",
  jobElement: ".profile__description",
});
