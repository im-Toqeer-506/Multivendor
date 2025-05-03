const express = require("express");
const router = express.Router();
const Messages = require("../model/messages");
const { upload } = require("../multer");
const path = require("path");
const ErrorHandler = require("../utils/ErrorHandler");
const catchAsyncError = require("../middleware/catchAsyncError");
//create new message
router.post(
  "/create-new-message",
  upload.single("images"),
  catchAsyncError(async (req, res, next) => {
    try {
      const messageData = req.body;
      if (req.file) {
        const filename = req.file.filename;
        const fileUrl = path.join(filename);
        messageData.images = fileUrl;
      }
      messageData.conversationId = req.body.conversationId;
      messageData.sender = req.body.sender;
      messageData.text = req.body.text;
      const message = new Messages({
        conversationId: messageData.conversationId,
        sender: messageData.sender,
        text: messageData.text,
        images: messageData.images ? messageData.images : undefined,
      });
      await message.save();
      res.status(201).json({
        success: true,
        message,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);
//get all messages with conversation ID
router.get(
  "/get-all-messages/:id",
  catchAsyncError(async (req, res, next) => {
    try {
      const messages = await Messages.find({
        conversationId: req.params.id,
      });
      res.status(201).json({
        success: true,
        messages,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);
module.exports = router;
