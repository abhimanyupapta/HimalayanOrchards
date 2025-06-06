const app = require("./app");
const cloudinary = require("cloudinary");
const connectDatabase = require("./config/database");



// Handling unCaught exeption
process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutting down the server due to unCaught exeption`);
  process.exit(1);
});

require("dotenv").config({ path: "./config/config.env" });

// Config
//if (process.env.NODE_ENV !== "PRODUCTION") {
//  require("dotenv").config({ path: "backend/config/config.env" });
//}

// Connecting to database
connectDatabase();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const server = app.listen(process.env.PORT, () => {
  console.log(`Server is working on http://localhost:${process.env.PORT}`);
});

//Unhandeled Promise Rejection
process.on("unhandledRejection", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutting down the server due to unhandeled promise rejection`);

  server.close(() => {
    process.exit(1);
  });
});
