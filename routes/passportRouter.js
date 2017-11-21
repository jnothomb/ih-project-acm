"use strict";

const express = require("express");
const router = express.Router();

// User model
const User = require("../models/user");

// Bcrypt to encrypt passwords
const bcrypt = require("bcrypt");
const bcryptSalt = 10;
const ensureLogin = require("connect-ensure-login");
const passport = require("passport");

router.get("/private-page", ensureLogin.ensureLoggedIn(), (req, res) => {
  res.render("passport/private", {
    user: req.user
  });
});

router.get("/signup", (req, res, next) => {
  res.render("passport/signup.ejs");
});

router.get("/welcome", (req, res, next) => {
  res.render("passport/welcome.ejs");
});

router.get("/registered", (req, res, next) => {
  res.render("passport/registered.ejs");
});

router.post("/signup", (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;
  if (username === "" || password === "") {
    res.render("passport/signup.ejs", {
      message: "Indicate username and password"
    });
    return;
  }

  User.findOne({
    username
  }, "username", (err, user) => {
    if (user !== null) {
      res.render("passport/signup.ejs", {
        message: "The username already exists"
      });
      return;
    }

    const salt = bcrypt.genSaltSync(bcryptSalt);
    const hashPass = bcrypt.hashSync(password, salt);
    const newUser = new User({
      username,
      password: hashPass
    });

    newUser.save((err) => {
      if (err) {
        res.render("passport/signup.ejs", {
          message: "Something went wrong"
        });
      } else {
        res.redirect("/registered");
      }
    });
  });
});

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/login");
});

router.get("/login", (req, res, next) => {
  res.render("passport/login");
});

router.post("/login", passport.authenticate("local", {
  successRedirect: "/welcome",
  failureRedirect: "/login",
  failureFlash: true,
  passReqToCallback: true
}));

router.get("/edit-profile", (req, res, next) => {
  res.render("passport/edit-profile");
});

router.post("/edit-profile", (req, res, next) => {
  const phoneNumber = req.body.phoneNumber;
  const email = req.body.email;
  const address = req.body.address;
  const facebook = req.body.facebook;
  const instagram = req.body.instagram;

  const updatedProfile = new User({
    phoneNumber: phoneNumber,
    email: email,
    address: address,
    facebook: facebook,
    instagram: instagram
  });

  User.updateOne({ username: req.body.username },
    { $set: updatedProfile });
});

module.exports = router;
