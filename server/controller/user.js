const express = require("express");
const path = require("path");
const ErrorHandler = require("../utils/ErrorHandler");
const { upload } = require("../multer");
const User = require("../model/user");
const catchAsyncError = require("../middleware/catchAsyncError");
const fs = require("fs");
const jwt = require("jsonwebtoken");
const sendToken = require("../utils/jwtToken");
const sendMail = require("../utils/SendMail");
const { isAthuenticated } = require("../middleware/auth");
const router = express.Router();
//craete_user Route
router.post("/create-user", upload.single("file"), async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
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
    const activationUrl = `http://localhost:5173/activation/${activationToken}`;
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
//create activation Token (Function)
const createActivationToken = (user) => {
  return jwt.sign(user, process.env.ACTIVATION_SECRET, {
    expiresIn: process.env.JWT_EXPIRES,
  });
};
//activate user Route
router.post(
  "/activation",
  catchAsyncError(async (req, res, next) => {
    try {
      const { activation_token } = req.body;
      const newUser = jwt.verify(
        activation_token,
        process.env.ACTIVATION_SECRET
      );
      if (!newUser) {
        next(new ErrorHandler("Invalid Token", 400));
      }
      const { name, email, password, avatar } = newUser;
      let user = await User.findOne({ email });
      if (user) {
        return next(new ErrorHandler("User already exists", 400));
      }

      user = await User.create({
        name,
        email,
        password,
        avatar,
      });
      await user.save();

      sendToken(user, 201, res);
    } catch (error) {
      next(new ErrorHandler(error.message, 500));
    }
  })
);
//Login User Route
router.post(
  "/login-user",
  catchAsyncError(async (req, res, next) => {
    try {
      let { email, password } = req.body;
      if (!email || !password)
        return next(new ErrorHandler("All Fileds are required!", 500));
      const user = await User.findOne({ email }).select("+password");
      if (!user) {
        return next(new ErrorHandler("User Does't Exist!", 400));
      }
      const ValidPassword = await user.comparePassword(password);
      if (!ValidPassword) {
        return next(
          new ErrorHandler("Please,Provide the correct information!", 400)
        );
      }
      sendToken(user, 201, res);
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);
//load User Route
router.get(
  "/getuser",
  isAthuenticated,
  catchAsyncError(async (req, res, next) => {
    try {
      const user = await User.findById(req.user._id);
      if (!user) {
        return next(new ErrorHandler("User does'nt exist!", 400));
      }
      res.status(200).json({
        success: true,
        user,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);
module.exports = router;
