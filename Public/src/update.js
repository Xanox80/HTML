document.addEventListener("DOMContentLoaded", function () {
  const updateForm = document.getElementById("updateApartmentForm");
  updateForm.addEventListener("submit", async function (event) {
    event.preventDefault();

    const apartmentId = document.getElementById("apartmentId").value;
    const name = document.getElementById("nameVilla").value;
    const surname = document.getElementById("surnameVilla").value;
    const price = document.getElementById("price").value;
    const residence = document.getElementById("residence").value;
    const city = document.getElementById("city").value;
    const photoInput = document.getElementById("photo").files[0];
    const base64PhotoInput = await convertToBase64(photoInput);

    try {
      const response = await fetch("/api/update", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: apartmentId,
          newData: {
            name,
            surname,
            price,
            residence,
            city,
            photoBase64: base64PhotoInput,
          },
        }),
      });
      if (response.ok) {
        const data = await response.json();
        console.log(data.message);
      } else {
        console.error("Помилка при оновленні:", response.statusText);
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
