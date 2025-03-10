const express = require("express");
const router = express.Router();
const ErrorHandler = require("../utils/ErrorHandler");
const catchAsyncError = require("../middleware/catchAsyncError");
const Shop = require("../model/shop");
const fs = require("fs");
const CoupounCode = require("../model/copunCode");
const { isSeller } = require("../middleware/auth");
router.post(
  "/create-coupun-code",
  isSeller,
  catchAsyncError(async (req, res, next) => {
    try {
      const isCoupounCodeExist = await CoupounCode.find({
        name: req.body.name,
      });
      if (isCoupounCodeExist.length !== 0) {
        return next(new ErrorHandler("Coupoun code already exists", 400));
      }
      const coupounCode = await CoupounCode.create(req.body);
      res.status(201).json({
        success: true,
        coupounCode,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);
module.exports = router;
