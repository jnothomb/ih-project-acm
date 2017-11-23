"use strict";

const express = require("express");
const router = express.Router();

// User model
const User = require("../models/user").User;

// Bcrypt to encrypt passwords
const bcrypt = require("bcrypt");
const bcryptSalt = 10;
const ensureLogin = require("connect-ensure-login");
const passport = require("passport");

router.get("/private-page", ensureLogin.ensureLoggedIn(), (req, res) => {
  res.render("profile/private", {
    user: req.user
  });
});

router.get("/signup", (req, res, next) => {
  const data = {
    message: ""
  };
  res.render("passport/signup.ejs", data);
});

// SIGNUP ROUTE TO CREATE PROFILE

router.post("/signup", (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const phoneNumber = req.body.phoneNumber;
  const email = req.body.email;
  const city = req.body.city;
  const country = req.body.country;
  const cohortYear = req.body.cohortYear;
  const cohortCity = req.body.cohortCity;
  const instagram = req.body.instagram;
  const linkedin = req.body.linkedin;
  const pinterest = req.body.pinterest;

  if (username === "" || password === "") {
    res.render("passport/signup.ejs", {
      message: "Indicate username and password"
    });
    return;
  }

  User.findOne({
    username
  }, "username", (err, user) => {
    if (err) {
      next(err);
    } else {
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
        password: hashPass,
        firstName,
        lastName,
        phoneNumber,
        email,
        city,
        country,
        cohortYear,
        cohortCity,
        instagram,
        linkedin,
        pinterest

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
    }
  });
});

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/login");
});

router.get("/login", (req, res, next) => {
  const data = {
    message: ""
  };
  res.render("passport/login", data);
});

router.post("/login", passport.authenticate("local", {
  successRedirect: "/contacts",
  failureRedirect: "/login",
  failureFlash: true,
  passReqToCallback: true
}));

module.exports = router;
