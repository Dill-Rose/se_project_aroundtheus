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
  avatarEdit,
  changeAvatarForm,
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
  .getAppInfo()
  .then(([userData, cards]) => {
    userInfo.setUserInfo(userData);
    cardSection.renderItems(cards);
  })
  .catch((err) => {
    console.error(err);
  });

/**Functions**/

function changeLikeStatus(card) {
  api
    .changeLikeStatus(card.getId(), card.isLiked())
    .then(() => {
      card.updateLikesView();
    })
    .catch((err) =>
      console.error(`An error occurred when changing like status: ${err}`)
    );
}

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
    handleDeleteClick,
    changeLikeStatus
  );
  return card.getView();
}

function renderCard(data) {
  const cardElement = createCard(data);
  cardSection.addItem(cardElement);
}

/**Event Handlers**/

function handleProfileSubmit(inputValues) {
  const name = inputValues.title;
  const about = inputValues.description;
  editProfilePopup.setLoading(true);
  api
    .editProfile(name, about)
    .then(() => {
      userInfo.setUserInfo({ name, about });
      editProfilePopup.close();
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => editProfilePopup.setLoading(false));
}

function handleAddNewCardSubmit(inputValues) {
  const name = inputValues.title;
  const link = inputValues.url;
  addCardPopup.setLoading(true);
  api
    .addNewCard({ name, link })
    .then((data) => {
      renderCard(data, cardListEl);
      addCardPopup.close();
      addCardForm.reset();
      addCardFormValidator.disableSubmitButton();
    })
    .catch((err) => console.error(err))
    .finally(() => addCardPopup.setLoading(false));
}

function handleAvatarSubmit(inputValues) {
  const link = inputValues.url;
  editAvatarPopup.setLoading(true);
  api
    .updateAvatar(link)
    .then(() => {
      userInfo.updateUserAvavtar(link);
      editAvatarPopup.close();
      changeAvatarForm.reset();
      changeAvatarFormValidator.disableSubmitButton();
    })
    .catch((err) => console.error(err))
    .finally(() => editAvatarPopup.setLoading(false));
}

/**Event Listeners**/

modalEdit.addEventListener("click", () => {
  const currentUserInfo = userInfo.getUserInfo();
  profileTitleInput.value = currentUserInfo.name;
  profileDescriptionInput.value = currentUserInfo.description;
  editProfilePopup.open();
});
addCardBtn.addEventListener("click", () => addCardPopup.open());
avatarEdit.addEventListener("click", () => editAvatarPopup.open());

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

const changeAvatarFormValidator = new FormValidator(
  formValidationSettings,
  changeAvatarForm
);

addCardFormValidator.enableValidation();
editCardFormValidator.enableValidation();
changeAvatarFormValidator.enableValidation();

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

const editAvatarPopup = new PopupWithForm(
  "#change-avatar-modal",
  handleAvatarSubmit
);

editAvatarPopup.setEventListeners();

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
  avatarElement: ".profile__image",
});

const confirmPopup = new PopupWithConfirm({ popupSelector: "#confirm-modal" });

confirmPopup.setEventListeners();
