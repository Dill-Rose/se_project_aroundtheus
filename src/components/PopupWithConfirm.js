import Popup from "./Popup";

export default class PopupWithConfirm extends Popup {
  constructor({ popupSelector }) {
    super({ popupSelector });
    // this._submitButton = this._popupElement.querySelector("modal__button");
    // this._submitButtonTextContent = this._submitButton.textContent;
  }

  // setLoading(isLoading, loadingText = "Saving...") {
  //   if (isLoading) {
  //     this._submitButtonTextContent = loadingText;
  //   } else {
  //     this._submitButton.textContent = this._submitButtonTextContent;
  //   }
  // }

  setSubmitAction(callback) {
    this._callback = callback;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupElement
      .querySelector("#confirm-form")
      .addEventListener("submit", (evt) => {
        evt.preventDefault();
        this._callback();
      });
  }
}
