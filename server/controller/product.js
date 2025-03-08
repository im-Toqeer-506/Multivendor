const express = require("express");
const router = express.Router();
const Product = require("../model/product");
const Shop = require("../model/shop");
const ErrorHandler = require("../utils/ErrorHandler");
const catchAsyncError = require("../middleware/catchAsyncError");
const { upload } = require("../multer");
const { isSeller } = require("../middleware/auth");
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
router.get(
  "/get-all-products-shop/:id",
  catchAsyncError(async (req, res, next) => {
    const products = await Product.find({ shopId: req.params.id });
    res.status(200).json({
      success: true,
      products,
    });
  })
);
router.delete(
  "/delete-shop-product/:id",
  isSeller,
  catchAsyncError(async (req, res, next) => {
    try {
      const productId = req.params.id;
      const productData = await Product.findById(productId);
      productData.images.forEach((img) => {
        const filename = img;
        const filepath = `uploads/${filename}`;
        fs.unlink((error, filepath) => {
          if (error) {
            console.log(error);
          }
        });
      });
      const product = await Product.findByIdAndDelete(productId);

      if (!product) {
        return new ErrorHandler("Product not found with thi ID", 500);
      }

      res.status(201).json({
        success: true,
        message: "Product Deleted Successfully!",
      });
    } catch (error) {
      return new ErrorHandler(error, 400);
    }
  })
);

// delete product of a shop
router.delete(
  "/delete-shop-product/:id",
  isSeller,
  catchAsyncError(async (req, res, next) => {
    try {
      const productId = req.params.id;
      const EventData = await Product.findById(productId);
      EventData.images.forEach((imageUrl) => {
        const filename = imageUrl;
        const filePath = `uploads/${filename}`;
        fs.unlink(filePath, (err) => {
          if (err) {
            console.log(err);
          }
        });
      });
      const product = await Product.findByIdAndDelete(productId);
      if (!product) {
        return next(
          new ErrorHandler("Event Product  not found with this id!", 500)
        );
      }

      res.status(201).json({
        success: true,
        message: "Product Deleted successfully!",
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

module.exports = router;
