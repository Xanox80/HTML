const express = require("express");
const Appeal = require("./model");

const router = express.Router();

router.post("/create", async (req, res) => {
  try {
    const { name, surname, price, residence, city, photoBase64 } = req.body;
    const appeal = new Appeal({
      name,
      surname,
      price,
      residence,
      city,
      photoBase64,
    });
    await appeal.save();
    res.json({ message: "Успішно створено." });
  } catch (error) {
    console.error("Помилка при створенні:", error);
    res.status(500).json({ error: "Помилка при створенні" });
  }
});

router.get("/apartments", async (req, res) => {
  try {
    const apartments = await Appeal.find({});
    res.json(apartments);
  } catch (error) {
    console.error("Error fetching apartments:", error);
    res.status(500).json({ error: "Error fetching apartments" });
  }
});

router.delete("/delete", async (req, res) => {
  try {
    const apartment = await Appeal.findOne({});
    if (!apartment) {
      return res.status(404).json({ error: "Apartment not found" });
    }
    await apartment.deleteOne();
    res.status(200).json({ message: "Apartment deleted successfully" });
  } catch (error) {
    console.error("Error when you want to delete apartment", error);
    res
      .status(500)
      .json({ error: "Error when you want to delete apartment", error });
  }
});

router.put("/update", async (req, res) => {
  try {
    const { id, newData } = req.body;
    const updatedApartment = await Appeal.findByIdAndUpdate(id, newData, {
      new: true,
    });
    if (!updatedApartment) {
      return res.status(404).json({ error: "Apartment not found" });
    }
    res
      .status(200)
      .json({ message: "Apartment updated successfully", updatedApartment });
  } catch (error) {
    console.error("Error updating apartment:", error);
    res.status(500).json({ error: "Error updating apartment", error });
  }
});
module.exports = router;
