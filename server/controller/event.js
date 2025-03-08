const express = require("express");
const router = express.Router();
const ErrorHandler = require("../utils/ErrorHandler");
const catchAsyncError = require("../middleware/catchAsyncError");
const { upload } = require("../multer");
const Shop = require("../model/shop");
const Event = require("../model/event");
router.post(
  "/create-event",
  upload.array("images"),
  catchAsyncError(async (req, res, next) => {
    try {
      const shopId = req.body.shopId;
      const shop = await Shop.findById(shopId);
      if (!shop) {
        return next(ErrorHandler("Shop Dose`nt Exist!", 404));
      } else {
        const files = req.files;
        const imgUrls = files.map((file) => `${file.filename}`);
        const eventData = req.body;
        eventData.images = imgUrls;
        eventData.shop = shop;
        const product = await Event.create(eventData);
        res.status(201).json({
          success: true,
          product,
        });
      }
    } catch (error) {
      return next(ErrorHandler(error, 400));
    }
  })
);
module.exports = router;
