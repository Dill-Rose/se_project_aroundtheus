import Popup from "./Popup";

export default class PopupWithConfirm extends Popup {
  constructor({ popupSelector }) {
    super({ popupSelector });
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
