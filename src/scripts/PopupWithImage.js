import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
  }
  open({ name, link }) {
    this._popupElement.querySelector("modal__title").textContent = name;
    const image = this._popupElement.querySelector("modal__image");
    image.src = link;
    image.alt = name;
    super.open();
  }
}
