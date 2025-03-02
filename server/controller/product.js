const express = require("express");
const router = express.Router();
const Product = require("../model/product");
const Shop = require("../model/shop");
const ErrorHandler = require("../utils/ErrorHandler");
const catchAsyncError = require("../middleware/catchAsyncError");
const { upload } = require("../multer");
router.post(
  "/create-product",
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
        const productData = req.body;
        productData.images = imgUrls;
        productData.shop = shop;
        const product = await Product.create(productData);
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
