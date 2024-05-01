document
  .getElementById("deleteApartmentForm")
  .addEventListener("submit", async function (event) {
    event.preventDefault();

    const apartmentId = document.getElementById("apartmentId").value;

    try {
      const response = await fetch("/api/delete", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: apartmentId }),
      });

      if (response.ok) {
        const data = await response.json();
        alert(data.message);
      } else {
        const errorMessage = await response.text();
        alert("Помилка при видаленні: " + errorMessage);
      }
    } catch (error) {
      console.error("Помилка при відправці:", error);
      alert("Помилка при відправці: " + error.message);
    }
  });
