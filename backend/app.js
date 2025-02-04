const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const path = require("path");

const cors = require("cors");

const errorMiddleware = require("./middleware/error");

require("dotenv").config({ path: "./config/config.env" });

// Config
//if (process.env.NODE_ENV !== "PRODUCTION") {
//  require("dotenv").config({ path: "config/config.env" });
//}

// Enable CORS for frontend
app.use(
  cors({
    origin: process.env.ALLOWED_ORIGINS, // Allow these domains
    credentials: true, // Allow credentials
  })
);

app.options("*", cors());

  
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());

// Route Imports
const product = require("./routes/productRoute");
const user = require("./routes/userRoute");
const order = require("./routes/orderRoute");
const payment = require("./routes/paymentRoute");

app.use("/api/v1", product);
app.use("/api/v1", user);
app.use("/api/v1", order);
app.use("/api/v1", payment);



//MiddleWare for error
app.use(errorMiddleware);

module.exports = app;
