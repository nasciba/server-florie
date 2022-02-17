const dotenv = require("dotenv").config();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const cors = require("cors");
const port = process.env.PORT;

const session = require("express-session");
const passport = require("passport");

require("./configs/passport.js");

mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true },)
  .then(() => {
    console.log(`Connected to Mongo! `);
  })
  .catch((err) => {
    console.error("Error connecting to mongo", err);
  });


const app = express();

 app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false })); 
app.use(cookieParser());

app.use(
  require("node-sass-middleware")({
    src: path.join(__dirname, "public"),
    dest: path.join(__dirname, "public"),
    sourceMap: true,
  })
);

 app.use(express.static(path.join(__dirname, "public")));

app.use(
  session({
    secret: "a certain secret",
    resave: true,
    saveUninitialized: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(
  cors({
    origin: [process.env.ORIGIN],
    credentials: true,
  })
); 

const index = require("./routes/index");
const productsRoutes = require("./routes/products-routes");
const fileUploadRoutes = require("./routes/file-routes");
const orderRoutes = require("./routes/order-routes");
app.use("/", index);
app.use("/api", productsRoutes);
app.use("/api", fileUploadRoutes);
app.use("/api", orderRoutes);

const authRoutes = require("./routes/auth-routes");
app.use("/api", authRoutes);

module.exports = app;
