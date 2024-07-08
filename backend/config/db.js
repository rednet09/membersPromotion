const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    // const URI =
    //   "mongodb+srv://Dhiraj:powerbang@memberspromotion.255zdv8.mongodb.net/?retryWrites=true&w=majority&appName=membersPromotion";

    await mongoose.connect(process.env.URI);
    console.log("MongoDB connected");
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
