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
    // Abrir dialog confirmacion
    document.addEventListener("click", (e) => {
      const openButton = e.target.closest(this._selectors.openButtonElement);
      if (openButton) {
        this.open(e);
      }
    });

    //botón de confirmación
    document
      .querySelector(this._selectors.confirmButtonElement)
      .addEventListener("click", () => {
        this._api.deleteCard(this._clickedButtonID).then(() => {
          this._clickedButton.remove();
          this.close();
        });
      });
    // Cerrar dialog confirmacion
    document
      .querySelector(this._selectors.closeButtonElement)
      .addEventListener("click", () => {
        this.close();
      });

    document.addEventListener("keydown", (e) => this._handleEscClose(e));
  }
}
