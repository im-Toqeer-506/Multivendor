const express = require("express");
const cors = require("cors");
const ErrorHandler = require("./middleware/error");
const cookieParser = require("cookie-parser");
// depricated
const bodyparser = require("body-parser");
// app.use(bodyparser.urlencoded({ extented: true }));
//Middlewares
const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(cors({ origin: "http://localhost:8000", credentials: true }));
app.use("/", express.static("uploads"));

//config
if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({
    path: "server/config/.env",
  });
}
//Import Routes
const user = require("./controller/user");
//Mount Routes
app.use("/api/v2/user", user);
//Error Handling Middleware
app.use(ErrorHandler);
module.exports = app;
