import { Card } from "./Card.js";
import Section from "./Section.js";
import { handleCardClick } from "./utils.js";

// class
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
    })
      .then((res) => res.json())
      .then((data) => {
        // Instancia de cards iniciales
        const cardList = new Section(
          {
            items: data,
            renderer: (item) => {
              const card = new Card(
                item,
                "#template-selector",
                handleCardClick
              );
              const cardElement = card.generateCard();
              cardList.addItem(cardElement);
            },
          },
          ".element-list__item"
        );
        cardList.renderItems();
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
    })
      .then((res) => res.json())
      .finally(() => {});
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
    })
      .then((res) => res.json())
      .then((data) => {});
  }

  deleteCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: {
        authorization: this._token,
      },
    })
      .then((res) => res.json())
      .catch((err) => console.log("Error al eliminar la tarjeta:", err));
  }

  changeLikeCardStatus(cardId, isLiked) {
    const method = isLiked ? "PUT" : "DELETE";
    const body = isLiked ? JSON.stringify({ isLiked: true }) : null;
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method,
      headers: {
        authorization: this._token,
        "Content-Type": "application/json",
      },
    }).then((res) => res.json());
  }

  //Funciones de carga

  renderTextLoading(isLoading, saveButtonElement) {
    saveButtonElement.textContent = isLoading ? "Guardando..." : "Guardar";
  }
}
