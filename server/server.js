const app = require("./app");
const dbConnection=require("./db/Database")
//Handling uncaugth Exception
process.on("uncaughtException", (error) => {
  console.log(`Error: ${error.message}`);
  console.log("Shutting Down the Server for handling uncaughtException");
});

//config
if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({
    path: "server/config/.env",
  });
}
//connection to database
dbConnection();

const server = app.listen(process.env.PORT, () => {
  console.log(
    `Server is running on the Prot http://localhost:${process.env.PORT}`
  );
});
//unhandle Promise rejection
process.on("unhandledRejection", (error) => {
  console.log(`Shutting down the server for ${error.message}`);
  console.log(`Shutting down the server for unhanadled  Promise rejection`);
  server.close(() => {
    process.exit(1);
  });
});
