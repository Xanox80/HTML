document.addEventListener("DOMContentLoaded", function () {
  const noteForm = document.getElementById("noteForm");
  noteForm.addEventListener("submit", async function (event) {
    event.preventDefault();

    const name = document.getElementById("nameVilla").value;
    const surname = document.getElementById("surnameVilla").value;
    const price = document.getElementById("price").value;
    const residence = document.getElementById("residence").value;
    const city = document.getElementById("city").value;
    const photoInput = document.getElementById("photo").files[0];
    const base64PhotoInput = await convertToBase64(photoInput);

    try {
      const response = await fetch("/api/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          surname,
          price,
          residence,
          city,
          photoBase64: base64PhotoInput,
        }),
      });
      if (response.ok) {
        const data = await response.json();
        console.log(data.message);
      } else {
        console.error("Помилка при створені:", response.statusText);
      }
    } catch (error) {
      console.error("Помилка при відправці:", error);
    }
  });
});

function convertToBase64(file) {
  if (file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = function (event) {
        const base64String = event.target.result.split(",")[1];
        resolve(base64String);
      };
      reader.onerror = function (error) {
        reject(error);
      };
      reader.readAsDataURL(file);
    });
  } else {
    return Promise.reject("Будь ласка, виберіть файл для завантаження.");
  }
}

document.addEventListener("DOMContentLoaded", function () {
  const getDataButton = document.getElementById("getDataButton");
  getDataButton.addEventListener("click", async function () {
    try {
      const response = await fetch("/api/apartments");
      const data = await response.json();
      displayData(data);
    } catch (error) {
      console.error("Помилка при отриманні даних:", error);
    }
  });
});

function displayData(data) {
  const notesContainer = document.getElementById("notes-container");
  notesContainer.innerHTML = "";

  data.forEach((apartment) => {
    const apartmentDiv = document.createElement("div");
    apartmentDiv.classList.add("apartment-item");

    apartmentDiv.innerHTML = `
      <p>Ім'я: ${apartment.name}</p>
      <p>Прізвище: ${apartment.surname}</p>
      <p>Ціна: ${apartment.price}</p>
      <p>Місце: ${apartment.residence}</p>
      <p>Місце: ${apartment.city}</p>
    `;

    const img = document.createElement("img");
    img.src = "data:image/jpeg;base64," + apartment.photoBase64;
    apartmentDiv.appendChild(img);

    notesContainer.appendChild(apartmentDiv);
  });
}

function createObject(name, surname, price, residence, city) {
  return {
    name,
    surname,
    price,
    residence,
    city,
  };
}

module.exports = createObject;
