const mongoose = require("mongoose");
const dbConnection = async () => {
  try {
    await mongoose.connect(`${process.env.MONGODB_URI}`);
    console.log("Connected!");
  } catch (error) {
    console.error("Error", error);
    throw err;
  }
};

module.exports = dbConnection;