import FormValidator from "../components/FormValidator.js";
import Card from "../components/Card.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import "../pages/index.css";
import { initialCards } from "../utils/constants.js";
import { formValidationSettings } from "../utils/constants.js";
import Api from "../components/Api.js";

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
import PopupWithConfirm from "../components/PopupWithConfirm.js";

const cardData = [];

const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "cbf1e137-6dc5-4837-aa36-72d8ab218669",
    "Content-Type": "application/json",
  },
});

api
  .getInitialCards()
  .then((res) => {
    console.log(res);
    cardSection.renderItems(res);
  })
  .catch((err) => {
    console.error(err);
  });

api
  .getUserInfo()
  .then((res) => {
    console.log(res);
    userInfo.setUserInfo(res);
  })
  .catch((err) => {
    console.error(err);
  });

/**Functions**/

function handleDeleteClick(cardId, card) {
  confirmPopup.open();
  confirmPopup.setSubmitAction(() => {
    api.deleteCard(cardId).then(() => {
      confirmPopup.close();
      card.remove();
    });
  });
}

function handleImageClick(data) {
  imagePopup.open(data);
}

function createCard(data) {
  const card = new Card(
    data,
    "#card-template",
    handleImageClick,
    handleDeleteClick
  );
  return card.getView();
}

function renderCard(data) {
  const cardElement = createCard(data);
  cardSection.addItem(cardElement);
}

/**Event Handlers**/

function handleProfileSubmit(inputValues) {
  console.log(inputValues);
  const name = inputValues.title;
  const about = inputValues.description;
  api
    .editProfile(name, about)
    .then(() => {
      userInfo.setUserInfo(inputValues);
      editProfilePopup.close();
    })
    .catch((err) => {
      console.error(err);
    });
}

function handleAddNewCardSubmit(inputValues) {
  console.log(inputValues);
  const name = inputValues.title;
  const link = inputValues.url;
  api
    .addNewCard({ name, link })
    .then((data) => {
      console.log(data);
      renderCard(data, cardListEl);
      addCardPopup.close();
      addCardForm.reset();
      addCardFormValidator.disableSubmitButton();
    })
    .catch((err) => console.log(err));
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
    renderer: (item) => {
      renderCard(item);
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

const confirmPopup = new PopupWithConfirm({ popupSelector: "#confirm-modal" });

confirmPopup.setEventListeners();
