import { Card } from "./Card.js";
import { profileAdd, formValidationImage, apiNewCard } from "./script.js";
export { handleCardClick, addNewCard };

//Funcion handleCardClick para la clase card
function handleCardClick(image, title) {
  document.querySelector(".element__modal-image").src = image;
  document.querySelector(".element__modal-title").textContent = title;
}

// Funcion para agregar nuevas cards
const addNewCard = () => {
  const newImageTitle = document.querySelector("#title").value;
  const imageURL = document.querySelector("#imageURL").value;
  const saveButtonElement = document.querySelector("#save-button-add");

  apiNewCard.renderTextLoading(true, saveButtonElement);

  apiNewCard
    .addNewCard({ name: newImageTitle, link: imageURL })
    .then((data) => {
      const card = new Card(
        {
          name: data.name,
          link: data.link,
          _id: data._id,
        },
        "#template-selector",
        handleCardClick,
        apiNewCard
      );

      const cardElement = card.generateCard();
      cardElement.setAttribute("id", data._id);
      document.querySelector(".element-list__item").prepend(cardElement);

      formValidationImage.setEventListener();
      formValidationImage.toggleSaveButton(
        formValidationImage.inputList,
        formValidationImage.buttonElement
      );

      document.querySelector("#add-card-form").reset();
      profileAdd.close();
    })
    .catch((err) => console.error("Error en el POST:", err))
    .finally(() => {
      apiNewCard.renderTextLoading(false, saveButtonElement);
    });
};
