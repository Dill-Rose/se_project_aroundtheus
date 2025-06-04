import Popup from "./Popup";

export default class PopupWithConfirm extends Popup {
  constructor({ popupSelector }) {
    super({ popupSelector });
    this._submitButton = this._popupElement.querySelector(".modal__button");
    this._submitButtonText = this._submitButton.textContent;
  }

  setLoading(isLoading) {
    if (!isLoading) {
      this._submitButton.textContent = "Saving...";
    } else {
      this._submitButtonText = this._submitButton.textContent;
    }
  }

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
