const express = require("express");
const path = require("path");
const ErrorHandler = require("../utils/ErrorHandler");
const { upload } = require("../multer");
const User = require("../model/user");

const router = express.Router();

router.post("/create-user", upload.single("file"), async (req, res, next) => {
  const { name, email, password } = req.body;
  //All fields are required
  if (!name || !email || !password) {
    return next(new ErrorHandler("All Fields Are Required", 400));
  }
  const userEmail = await User.findOne({ email });
  // if the user Email already found in our DataBase
  if (userEmail) {
    return next(new ErrorHandler("User Already Exist", 409));
  }

  const filename = req.file.filename;
  const fileURL = path.join(filename);

  const avatar = fileURL;

  //if not then we will create a new User
  const user = new User({
    name,
    email,
    password,
    avatar: fileURL,
  });
  await user.save();
  res.status(201).json({
    success: true,
    user,
  });
});
module.exports = router;
