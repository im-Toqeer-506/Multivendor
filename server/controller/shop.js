const express = require("express");
const fs = require("fs");
const path = require("path");
const jwt = require("jsonwebtoken");
const router = express.Router();
const { upload } = require("../multer");
const sendToken = require("../utils/jwtToken");
const sendMail = require("../utils/SendMail");
const { isAthuenticated } = require("../middleware/auth");
const ErrorHandler = require("../utils/ErrorHandler");
const Shop = require("../model/shop");
const catchAsyncError = require("../middleware/catchAsyncError");

router.post("/create-shop", upload.single("file"), async (req, res, next) => {
  try {
    const { name, email, password, address, zipCode, phoneNumber } = req.body;
    if (!name || !email || !password) {
      return next(new ErrorHandler("All Fields are Required!", 400));
    }
    const Selleremail = await Shop.findOne({ email });
    if (Selleremail) {
      return next(new ErrorHandler("Seller is Already Exist!", 400));
    }
    const file = req.file.filename;
    const fileURL = path.join(file);
    const seller = {
      name,
      email,
      password,
      address,
      zipCode,
      phoneNumber,
      avatar: fileURL,
    };
    const activationToken = createActivationToken(seller);
    const activationUrl = `http://localhost:5173/seller/activation/${activationToken}`;
    try {
      await sendMail({
        email: seller.email,
        subject: "Activate Your Account!",
        message: `Hello!\n Dear ${seller.name} Seller!\n Please click on the link below to activate your account \n${activationUrl}`,
      });
      res.status(201).json({
        success: true,
        message: `Please check your email:-${seller.email} to activate your account!`,
      });
    } catch (error) {
      next(new ErrorHandler(error.message, 500));
    }
  } catch (error) {
    console.log(error);
  }
});
//create activation Token (Function)
const createActivationToken = (seller) => {
  return jwt.sign(seller, process.env.ACTIVATION_SECRET, {
    expiresIn: process.env.JWT_EXPIRES,
  });
};
//activate user Route
router.post(
  "/activation",
  catchAsyncError(async (req, res, next) => {
    try {
      const { activation_token } = req.body;

      const newSeller = jwt.verify(
        activation_token,
        process.env.ACTIVATION_SECRET
      );

      if (!newSeller) {
        return next(new ErrorHandler("Invalid token", 400));
      }
      const {
        name,
        email,
        password,
        avatar,
        zipCode,
        address,
        phoneNumber,
      } = newSeller;

      let seller = await Shop.findOne({ email });

      if (seller) {
        return next(new ErrorHandler("User already exists", 400));
      }

      seller = await Shop.create({
        name,
        email,
        avatar,
        password,
        zipCode,
        address,
        phoneNumber,
      });

      sendToken(seller, 201, res);
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

module.exports = router;
