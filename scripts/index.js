document.addEventListener("DOMContentLoaded", function () {
  let buttonEdit = document.querySelector(".profile__edit");
  let openPopup = document.querySelector(".popup");
  let buttonClose = document.querySelector(".popup__close");
  let closePopup = document.querySelector(".popup");
  let buttonsLike = document.querySelectorAll(".element__button");
  let inputName = document.querySelector(".form__input_name");
  let inputAbout = document.querySelector(".form__input_about");
  let textTitle = document.querySelector(".profile__title");
  let textText = document.querySelector(".profile__text");
  let textName = textTitle.textContent;
  let textAbout = textText.textContent;
  let buttonSubmit = document.querySelector(".form__submit");
  const loaderTimeout = 5000;

  function open() {
    if (openPopup.style.display === "none" || openPopup.style.display === "") {
      openPopup.style.display = "flex";
      document.getElementById("loader").style.display = "block";
      document.getElementById("loader__circle").style.display = "none";
      setTimeout(function () {
        document.getElementById("loader").style.display = "none";
        document.getElementById("loader__circle").style.display = "block";
        inputName.value = textName;
        inputAbout.value = textAbout;
        buttonSubmit.style.backgroundColor = "#000000";
      }, loaderTimeout);
    } else {
      openPopup.style.display = "none";
    }
  }

  function close() {
    if (closePopup.style.display === "flex") {
      closePopup.style.display = "none";
      inputName.value = "";
      inputAbout.value = "";
      buttonSubmit.style.backgroundColor = "#FFFFFF";
    } else {
      closePopup.style.display = "flex";
    }
  }

  function like() {
    let button = event.target;
    let currentBackground = window.getComputedStyle(button).backgroundImage;
    if (currentBackground.includes("btn-like-nr.png")) {
      button.style.backgroundImage = 'url("./images/btn-like-ac.png")';
    } else {
      button.style.backgroundImage = 'url("./images/btn-like-nr.png")';
    }
  }

  function handleProfileFormSubmit(evt) {
    evt.preventDefault();
    console.log(inputName.value);
    console.log(inputAbout.value);
    textTitle.textContent = inputName.value;
    textText.textContent = inputAbout.value;
    closePopup.style.display = "none";
    inputName.value = "";
    inputAbout.value = "";
    buttonSubmit.style.backgroundColor = "#FFFFFF";
  }

  buttonClose.addEventListener("click", close);
  buttonsLike.forEach((button) => {
    button.addEventListener("click", like);
  });
  buttonSubmit.addEventListener("click", handleProfileFormSubmit);
  buttonEdit.addEventListener("click", open);
});
