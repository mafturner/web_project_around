import Api from "./Api.js";
import Popup from "./Popup.js";
export default class PopupWithConfirmation extends Popup {
  constructor(selectors, apiInstance) {
    super(selectors);
    this._clickedButton = null;
    this._clickedButtonID = null;
    this._api = apiInstance;
  }

  open(e) {
    super.open();

    this._clickedButton = e.target.closest(".element");
    this._clickedButtonID = this._clickedButton.id;
  }

  setEventListeners() {

    document.addEventListener("click", (e) => {
      const openButton = e.target.closest(this._selectors.openButtonElement);
      if (openButton) {
        this.open(e);
      }
    });


    document
      .querySelector(this._selectors.confirmButtonElement)
      .addEventListener("click", () => {
        this._api.deleteCard(this._clickedButtonID).then(() => {
          this._clickedButton.remove();
          this.close();
        });
      });
    
    document
      .querySelector(this._selectors.closeButtonElement)
      .addEventListener("click", () => {
        this.close();
      });

    document.addEventListener("keydown", (e) => this._handleEscClose(e));
  }
}
