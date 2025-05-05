import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(selectors) {
    super(selectors);
  }

  setEventListeners() {
    document.addEventListener("click", (event) => {
      const openButton = event.target.closest(
        this._selectors.openButtonElement
      );
      if (openButton) {
        console.log("abrir");
        this.open(event);
      }

      const closeButton = event.target.closest(
        this._selectors.closeButtonElement
      );
      if (closeButton) {
        console.log("cerrar");
        this.close(event);
      }
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        this.close();
      }
    });
  }
  open(image, title) {
    const imgContainer = document.querySelector(".element__modal-image");
    const titleContainer = document.querySelector(".element__modal-title");

    imgContainer.src = image;
    imgContainer.alt = title;
    titleContainer.textContent = title;

    super.open();
  }
}
