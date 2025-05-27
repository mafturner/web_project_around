// script.js
import FormValidator from "./FormValidator.js";
import Popup from "./Popup.js";
import PopupWithImage from "./PopupWithImage.js";
import PopUpWithForm from "./PopUpWithForm.js";
import PopupWithConfirmation from "./PopupWithConfirmation.js";
import UserInfo from "./UserInfo.js";
import { addNewCard, handleCardClick } from "./utils.js";
import Section from "./Section.js";
import { Card } from "./Card.js";
import Api from "./Api.js";

export {
  info,
  profileAdd,
  formValidationImage,
  apiNewCard,
  profileEdit,
  profileEditImage,
};

const api = new Api({
  baseUrl: "https://around-api.es.tripleten-services.com/v1",
  token: "8d9f858e-3617-4eb7-9695-9b891911083c",
});

const info = new UserInfo({
  nameSelector: "#profile-name",
  jobSelector: "#profile-job",
  avatarSelector: ".profile__avatar",
});

const apiNewCard = api;

Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([userData, cardsData]) => {
    info.setUserInfo({
      name: userData.name,
      job: userData.about,
      avatar: userData.avatar,
    });

    info._userId = userData._id;

    const cardList = new Section(
      {
        items: cardsData,
        renderer: (item) => {
          const card = new Card(
            item,
            "#template-selector",
            handleCardClick,
            api,
            userData._id
          );
          const cardElement = card.generateCard();
          document.querySelector(".element-list__item").prepend(cardElement);
        },
      },
      ".element-list__item"
    );
    cardList.renderItems();

    document.querySelector("#name").value = userData.name;
    document.querySelector("#job").value = userData.about;
  })
  .catch((err) => console.error("❌ Error al cargar datos iniciales:", err));

const imageForm = document.querySelector("#add-card-form");
imageForm.addEventListener("submit", addNewCard);

// POPUPS
const profileEdit = new Popup({
  dialogID: "#modal-edit",
  formID: "#profile-form",
  openButtonElement: "#edit-button-open",
  closeButtonElement: "#edit-button-close",
});

const profileAdd = new Popup({
  dialogID: "#modal-add",
  formID: "#profile-form",
  openButtonElement: "#add-button-open",
  closeButtonElement: "#add-button-close",
});

const profileEditImage = new Popup({
  dialogID: "#modal-avatar",
  formID: "#avatar-form",
  openButtonElement: "#avatar-edit-button",
  closeButtonElement: "#avatar-button-close",
});

const openImage = new PopupWithImage({
  openButtonElement: ".element__button-image",
  closeButtonElement: "#dialog-close-button",
  dialogID: "#modal-image",
});

const deleteCard = new PopupWithConfirmation(
  {
    dialogID: "#modal-delete",
    openButtonElement: "#delete-image-btn",
    closeButtonElement: "#confirmation-dialog-close",
    confirmButtonElement: ".profile__delete-button",
  },
  api
);

// VALIDATION
const formValidationProfile = new FormValidator("#profile-form", {
  inputSelector: ".profile__edit-form-input",
  inputErrorClass: "form__input_type_error",
  errorClass: "form__input-error_active",
  buttonSelector: ".profile__edit-form-button",
});
formValidationProfile.enableValidation();

const formValidationImage = new FormValidator("#modal-add", {
  inputSelector: ".profile__edit-form-input",
  inputErrorClass: "#title-error",
  errorClass: "form__input-error_active",
  buttonSelector: ".profile__edit-form-button",
});
formValidationImage.enableValidation();

const formValidationAvatar = new FormValidator("#avatar-form", {
  inputSelector: ".profile__edit-form-input",
  inputErrorClass: "#title-error",
  errorClass: "form__input-error_active",
  buttonSelector: ".profile__edit-form-button",
});
formValidationAvatar.enableValidation();

const profilePopupForm = new PopUpWithForm(
  (inputValues) => {
    info.setUserInfo(inputValues);
  },
  "#modal-edit",
  { dialogID: "#modal-edit" }
);
profilePopupForm.setEventListeners();

const avatarPopupForm = new PopUpWithForm(
  (inputValues) => {
    info.setAvatar(inputValues);
  },
  "#modal-avatar",
  { dialogID: "#modal-avatar" }
);
avatarPopupForm.setEventListeners();
