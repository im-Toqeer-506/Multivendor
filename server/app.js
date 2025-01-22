const express = require("express");
const app = express();
app.get("/", (req, res) => {
  res.send("Server is Running!");
});

app.listen(3000, () => {
  console.log("Server is Working on http://localhost:3000");
});
