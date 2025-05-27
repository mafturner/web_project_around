export default class Popup {
  constructor(selectors) {
    this._selectors = selectors;
    this.setEventListeners();
  }

  // Funcion para abrir Dialogs
  open() {
    const dialog = document.querySelector(this._selectors.dialogID);

    if (dialog) {
      dialog.show();
      this.opacityPage(true);
    }
  }

  // Cerrar dialog
  close() {
    const dialog = document.querySelector(this._selectors.dialogID);
    if (dialog) {
      dialog.close();
      this.opacityPage(false);
    }
  }

  //Opacidad de la pagina
  opacityPage(dim) {
    const elements = document.querySelectorAll(
      ".profile, .header, .elements, .footer, .element-list__item"
    );
    elements.forEach((element) => {
      element.style.opacity = dim ? "0.5" : "1";
    });
  }

  // cerrar popup con ESC
  _handleEscClose(event) {
    if (event.key === "Escape") {
      this.close();
    }
  }

  setEventListeners() {
    document
      .querySelector(this._selectors.openButtonElement)
      .addEventListener("click", () => {
        console.log("abrir");
        this.open();
      });

    document
      .querySelector(this._selectors.closeButtonElement)
      .addEventListener("click", () => {
        console.log("cerrar");
        this.close();
      });

    document.addEventListener("keydown", (event) =>
      this._handleEscClose(event)
    );

    document.addEventListener("click", (e) => {
      const dialog = document.querySelector(this._selectors.dialogID);
      if (
        dialog &&
        !dialog.contains(e.target) &&
        !document
          .querySelector(this._selectors.openButtonElement)
          .contains(e.target)
      ) {
        this.close();
      }
    });
  }
}
