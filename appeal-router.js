// routes/villaRoutes.js
const express = require("express");
const Appeal = require("./model");
const fs = require("fs");

const router = express.Router();
const path = require("path");

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

module.exports = router;
