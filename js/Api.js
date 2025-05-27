// Api.js
import { Card } from "./Card.js";
import Section from "./Section.js";
import { handleCardClick } from "./utils.js";

export default class Api {
  constructor({ baseUrl, token }) {
    this._baseUrl = baseUrl;
    this._token = token;
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: {
        authorization: this._token,
      },
    }).then((res) => {
      if (!res.ok) throw new Error(`Error: ${res.status}`);
      return res.json();
    });
  }

  addNewCard({ name, link }) {
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: {
        authorization: this._token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, link }),
    }).then((res) => {
      if (!res.ok) throw new Error(`Error: ${res.status}`);
      return res.json();
    });
  }

  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: {
        authorization: this._token,
      },
    }).then((res) => {
      if (!res.ok) throw new Error(`Error: ${res.status}`);
      return res.json();
    });
  }

  updateUserInfo(newUserData) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: {
        authorization: this._token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: newUserData.name,
        about: newUserData.job,
      }),
    }).then((res) => {
      if (!res.ok) throw new Error(`Error: ${res.status}`);
      return res.json();
    });
  }

  setAvatar(newAvatarData) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: {
        authorization: this._token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        avatar: newAvatarData.avatarURL,
      }),
    }).then((res) => {
      if (!res.ok) throw new Error(`Error: ${res.status}`);
      return res.json();
    });
  }

  deleteCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: {
        authorization: this._token,
      },
    }).then((res) => {
      if (!res.ok) throw new Error(`Error al eliminar tarjeta: ${res.status}`);
      return res.json();
    });
  }

  changeLikeCardStatus(cardId, isLiked) {
    const method = isLiked ? "PUT" : "DELETE";
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method,
      headers: {
        authorization: this._token,
      },
    }).then((res) => {
      if (!res.ok) throw new Error(`Error en like: ${res.status}`);
      return res.json();
    });
  }

  renderTextLoading(isLoading, saveButtonElement) {
    saveButtonElement.textContent = isLoading ? "Guardando..." : "Guardar";
  }
}
