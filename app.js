"use strict";
const mongoose = require("mongoose");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const express = require("express");
const path = require("path");
const logger = require("morgan");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const app = express();
const configurePassport = require("./helpers/passport");

// mongoose configuration
mongoose.Promise = Promise;
mongoose.connect("mongodb://localhost/automated-contact-manager", {
  keepAlive: true,
  reconnectTries: Number.MAX_VALUE,
  useMongoClient: true
});

// require the user model
const passport = require("passport");
const flash = require("connect-flash");

// declaring routes
const index = require("./routes/index");
const passportRouter = require("./routes/passportRouter");

// enable sessions here
app.use(flash());
app.use(session({
  store: new MongoStore({
    mongooseConnection: mongoose.connection,
    ttl: 24 * 60 * 60 // 1 day
  }),
  secret: "some-string",
  resave: true,
  saveUninitialized: true,
  cookie: {
    maxAge: 24 * 60 * 60 * 1000
  }
}));

// - passport

configurePassport();
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

// User available for all templates
app.use(function (req, res, next) {
  res.locals.user = req.user;
  next();
});

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// require in the routers
app.use("/", index);
app.use("/", passportRouter);

// catch 404 and forward to error handler

app.use(function (req, res, next) {
  const err = new Error("Not Found");
  err.status = 404;
  next(err);
});
// error handler

app.use(function (err, req, res, next) {
  // set locals, only providing error in development

  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  // render the error page
  res.status(err.status || 500);
  res.render("error");
});
module.exports = app;
