// UserInfo.js
import Api from "./Api.js";
import { profileEdit, profileEditImage } from "./script.js";

export default class UserInfo {
  constructor(infoSelectors) {
    this._infoSelectors = infoSelectors;

    this._api = new Api({
      baseUrl: "https://around-api.es.tripleten-services.com/v1",
      token: "8d9f858e-3617-4eb7-9695-9b891911083c",
    });

    this._userId = null;
  }

  getUserId() {
    return this._userId;
  }

  getUserInfo() {
    const nameElement = document.querySelector(
      this._infoSelectors.nameSelector
    );
    const jobElement = document.querySelector(this._infoSelectors.jobSelector);

    if (nameElement && jobElement) {
      return {
        name: nameElement.textContent,
        job: jobElement.textContent,
      };
    }
  }

  setUserInfo(newUserData) {
    const nameElement = document.querySelector(
      this._infoSelectors.nameSelector
    );
    const jobElement = document.querySelector(this._infoSelectors.jobSelector);
    const saveButtonElement = document.querySelector("#save-button");

    nameElement.textContent = newUserData.name;
    jobElement.textContent = newUserData.job;

    if (newUserData.avatar) {
      const avatarElement = document.querySelector(
        this._infoSelectors.avatarSelector
      );
      avatarElement.src = newUserData.avatar;
    }

    if (newUserData._id) {
      this._userId = newUserData._id;
    }

    this._api.renderTextLoading(true, saveButtonElement);

    this._api.updateUserInfo(newUserData).finally(() => {
      this._api.renderTextLoading(false, saveButtonElement);
      profileEdit.close();
    });
  }

  getProfileInfo(formValidator = null) {
    this._api
      .getUserInfo()
      .then((data) => {
        this.setUserInfo({
          name: data.name,
          job: data.about,
          avatar: data.avatar,
          _id: data._id,
        });

        this._updateFormValues(data, formValidator);
      })
      .catch((error) => {
        console.error("Error al obtener información del perfil:", error);
      });
  }

  _updateFormValues(data, formValidator) {
    const inputName = document.querySelector("#name");
    const inputJob = document.querySelector("#job");

    if (inputName && inputJob) {
      inputName.value = data.name;
      inputJob.value = data.about;

      if (formValidator) {
        formValidator.toggleSaveButton(
          formValidator.inputList,
          formValidator.buttonElement
        );
      }
    }
  }

  setAvatar(newAvatarData) {
    const avatarElement = document.querySelector(
      this._infoSelectors.avatarSelector
    );
    const saveButtonElement = document.querySelector("#save-button-avatar");

    this._api.renderTextLoading(true, saveButtonElement);

    setTimeout(() => {
      avatarElement.src = newAvatarData.avatarURL;
      this._api.setAvatar(newAvatarData);
      this._api.renderTextLoading(false, saveButtonElement);
      profileEditImage.close();
    }, 2000);
  }
}
