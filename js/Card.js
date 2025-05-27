// Card.js
export class Card {
  constructor(data, templateSelector, handleCardClick, apiInstance, userId) {
    this._image = data.link;
    this._title = data.name;
    this._id = data._id;
    this._likes = data.likes || [];
    this._userId = userId;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._api = apiInstance;
  }

  _getTemplate() {
    const template = document.querySelector(this._templateSelector);
    return template.content.querySelector(".element").cloneNode(true);
  }

  generateCard() {
    this._element = this._getTemplate();
    const titleElement = this._element.querySelector(".element__title");
    const imgElement = this._element.querySelector(".element__image");
    const likeButton = this._element.querySelector(".element__button-like");
    const likeIcon = this._element.querySelector(".element__like-button");

    titleElement.textContent = this._title;
    imgElement.src = this._image;
    imgElement.alt = this._title;
    this._element.id = this._id;

    this.isLiked = this._likes.some((user) => user._id === this._userId);
    this.updateLikeButtonState(likeIcon);

    imgElement.addEventListener("click", () => {
      this._handleCardClick(this._image, this._title);
    });

    likeButton.addEventListener("click", () => {
      const newIsLiked = !this.isLiked;

      this._api
        .changeLikeCardStatus(this._id, newIsLiked)
        .then((data) => {
          console.log("🛰️ Respuesta del servidor:", data);

          if (!data || !data.likes || !Array.isArray(data.likes)) {
            console.warn("⚠️ 'likes' no está presente, usando estado local.");
            this.isLiked = newIsLiked;
          } else {
            this._likes = data.likes;
            this.isLiked = this._likes.some(
              (user) => user._id === this._userId
            );
          }

          this.updateLikeButtonState(likeIcon);
        })
        .catch((err) => {
          console.error(
            `❌ Error al ${newIsLiked ? "dar" : "quitar"} like:`,
            err
          );
        });
    });

    return this._element;
  }

  updateLikeButtonState(likeIcon) {
    likeIcon.src = this.isLiked
      ? "../images/heart-on.svg"
      : "../images/heart.svg";
  }
}
