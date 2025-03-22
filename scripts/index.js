const cardTemplate = document.querySelector(".template");
const cardsContent = document.querySelector(".cards__content");
const profilePopup = document.querySelector("#profile-popup");
const profileForm = document.querySelector("#profile-form");
const profileOpenBtn = document.querySelector("#profile-open-btn");
const profileCloseBtn = document.querySelector("#profile-close-btn");
const cardPopup = document.querySelector("#card-popup");
const cardForm = document.querySelector("#card-form");
const cardOpenBtn = document.querySelector("#card-open-btn");
const cardCloseBtn = document.querySelector("#card-close-btn");
const imagePopup = document.querySelector("#image-popup");
const imageCloseBtn = document.querySelector("#image-close-btn");
// const page = document.querySelector(".page");

const initialCards = [
  {
    name: "Valle de Yosemite",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/yosemite.jpg",
  },
  {
    name: "Lago Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/lake-louise.jpg",
  },
  {
    name: "Montañas Calvas",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/latemar.jpg",
  },
  {
    name: "Parque Nacional de la Vanoise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/lago.jpg",
  },
];

function loadInitialCards(initialCards) {
  initialCards.forEach(function (item) {
    const card = createCard(item.name, item.link);
    cardsContent.append(card);
  });
}

function createCard(title, link) {
  const cardElement = cardTemplate
    .cloneNode(true)
    .content.querySelector(".card");
  cardElement.querySelector(".card__title").textContent = title;
  const cardImage = cardElement.querySelector(".card__image");
  cardImage.src = link;
  cardImage.alt = title;
  cardElement
    .querySelector(".card__like-btn")
    .addEventListener("click", function (evt) {
      evt.target.classList.toggle("card__black-like-btn");
    });
  // evt.target.style.backgroundImage = "url('../images/cards/black-like.svg')";
  // Esta forma tambien funciona pero no permite alternar la url con cada click

  cardElement
    .querySelector(".card__trash-btn")
    .addEventListener("click", function (evt) {
      const cardItem = evt.target.closest(".card");
      cardItem.remove();
    });

  cardImage.addEventListener("click", function (evt) {
    const link = evt.target.parentElement.querySelector(".card__image").src;
    imagePopup.querySelector(".popup__expanded-image").src = link;

    const title =
      evt.target.parentElement.querySelector(".card__title").textContent;
    imagePopup.querySelector(".popup__image-title").textContent = title;

    handleTogglePopup(imagePopup);
  });
  return cardElement;
}

function handleTogglePopup(popupElement) {
  popupElement.classList.toggle("popup__opened");
}

profileOpenBtn.addEventListener("click", function () {
  const name = document.querySelector(".profile__name").textContent;
  const about = document.querySelector(".profile__about").textContent;
  profileForm.querySelector("#name-input").value = name;
  profileForm.querySelector("#about-input").value = about;
  handleTogglePopup(profilePopup);
});

profileCloseBtn.addEventListener("click", function () {
  handleTogglePopup(profilePopup);
});

cardOpenBtn.addEventListener("click", function () {
  handleTogglePopup(cardPopup);
});

cardCloseBtn.addEventListener("click", function () {
  cardForm.querySelector("#title-input").value = "";
  cardForm.querySelector("#link-input").value = "";
  handleTogglePopup(cardPopup);
});

imageCloseBtn.addEventListener("click", function () {
  handleTogglePopup(imagePopup);
});

// Cerrar cualquier formulario abierto al presionar la tecla ESC
document.addEventListener("keydown", function (event) {
  if (
    event.key === "Escape" &&
    imagePopup.classList.contains("popup__opened")
  ) {
    handleTogglePopup(imagePopup);
  } else if (
    event.key === "Escape" &&
    cardPopup.classList.contains("popup__opened")
  ) {
    handleTogglePopup(cardPopup);
  } else if (
    event.key === "Escape" &&
    profilePopup.classList.contains("popup__opened")
  ) {
    handleTogglePopup(profilePopup);
  }
});

function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  const nameInput = profileForm.querySelector("#name-input").value;
  const aboutInput = profileForm.querySelector("#about-input").value;

  document.querySelector(".profile__name").textContent = nameInput;
  document.querySelector(".profile__about").textContent = aboutInput;

  handleTogglePopup(profilePopup);
}

function handleCardFormSubmit(evt) {
  evt.preventDefault();

  const titleInput = cardForm.querySelector("#title-input").value;
  const linkInput = cardForm.querySelector("#link-input").value;
  const card = createCard(titleInput, linkInput);
  cardsContent.prepend(card);

  cardForm.querySelector("#title-input").value = "";
  cardForm.querySelector("#link-input").value = "";
  handleTogglePopup(cardPopup);
}

const setPopupEventListeners = (settings) => {
  const popupList = Array.from(
    document.querySelectorAll(settings.popupSelector)
  );
  popupList.forEach((popupElement) => {
    // Cerrar cualquier formulario abierto al dar click en la superposición
    popupElement.addEventListener("click", function (evt) {
      // Verifica si el clic ocurrió fuera de la ventana modal
      if (evt.target.classList.contains(settings.popupOpenedClass)) {
        handleTogglePopup(evt.target);
      }
    });
  });
};

setPopupEventListeners({
  popupSelector: ".popup",
  popupOpenedClass: "popup__opened",
});

loadInitialCards(initialCards);
profileForm.addEventListener("submit", handleProfileFormSubmit);
cardForm.addEventListener("submit", handleCardFormSubmit);
