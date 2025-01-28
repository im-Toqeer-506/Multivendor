const express = require("express");
const path = require("path");
const ErrorHandler = require("../utils/ErrorHandler");
const { upload } = require("../multer");
const User = require("../model/user");
const catchAsyncError = require("../middleware/catchAsyncError");
const fs = require("fs");
const jwt = require("jsonwebtoken");
const user = require("../model/user");
const JwtToken=require("../utils/jwtToken")
const sendMail = require("../utils/SendMail");
const router = express.Router();

router.post("/create-user", upload.single("file"), async (req, res, next) => {
  const { name, email, password } = req.body;
  try {
    //All fields are required
    if (!name || !email || !password) {
      return next(new ErrorHandler("All Fields Are Required!", 400));
    }

    const userEmail = await User.findOne({ email });
    // if the user Email already found in our DataBase
    if (userEmail) {
      //the file should also be deleted from server
      const filename = req.file.filename;
      const filePath = `uploads/${filename}`;
      fs.unlink(filePath, (err) => {
        if (err) {
          console.log(err);
          res.status(500).json({
            message: "Error Deleting Files",
          });
        } else {
          res.status(201).json({ message: "File deleted successfully" });
        }
      });

      return next(new ErrorHandler("User Already Exist", 409));
    }

    //if not then we will create a new User

    const filename = req.file.filename;
    const fileURL = path.join(filename);
    const user = {
      name,
      email,
      password,
      avatar: fileURL,
    };
    const activationToken = createActivationToken(user);
    const activationUrl = `http://localhost:3000/activation/${activationToken}`;
    try {
      await sendMail({
        email: user.email,
        subject: "Activate Your Account!",
        message: `Hello!\n Dear ${user.name}\n Please click on the link below to activate your account \n${activationUrl}`,
      });
      res.status(201).json({
        success: true,
        message: `Please check your email:-${user.email} to activate your account!`,
      });
    } catch (error) {
      next(new ErrorHandler(error.message, 500));
    }
  } catch (error) {
    next(new ErrorHandler(error.message, 400));
  }
});
//create activation Token
const createActivationToken = (user) => {
  return jwt.sign(user, process.env.ACTIVATION_SECRET, {
    expiresIn: process.env.JWT_EXPIRES,
  });
};
//activate user
router.post(
  "/activation",
  catchAsyncError(async (req, res, next) => {
    try {
      const { activation_token } = req.body;
      const newUser = jwt.verify(
        activation_token,
        process.env.ACTIVATION_SECRET
      );
      if(!newUser){
        next(new ErrorHandler("Invalid Token",400))
      }
      await User.create({
        name,
        email,
        password,
        avatar,
      })
    } catch (error) {
      next(error);
    }

  })
);
module.exports = router;
