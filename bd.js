const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/web", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("Connected to MongoDB");
    console.log("MongoDB models: \n" + Object.keys(mongoose.models));
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(500);
  }
};

module.exports = connectDB;
