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

        const clickedCard = openButton.closest(".element-list__item .element");
        if (clickedCard) {
          const imgElement = clickedCard.querySelector(".element__image");
          const image = imgElement.src;
          const title =
            clickedCard.querySelector(".element__title").textContent;

          this.open(image, title);
        }
      }

      const closeButton = event.target.closest(
        this._selectors.closeButtonElement
      );
      if (closeButton) {
        console.log("cerrar");
        this.close();
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
