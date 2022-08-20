import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._name = this._popup.querySelector('.img-popup__title');
    this._link = this._popup.querySelector('.img-popup__image');
  }

  /** Открыть попап */
  open(name, link) {
    super.open();
    this._name.textContent = name;
    this._link.alt = name;
    this._link.src = link;
  }
}
