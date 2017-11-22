"use strict";

const express = require("express");
const router = express.Router();
const ensureLogin = require("connect-ensure-login");
// User model
const User = require("../models/user").User;

router.get("/welcome", ensureLogin.ensureLoggedIn(), (req, res, next) => {
  User.findOne({ _id: req.user._id }, (err, result) => {
    if (err) {
      next(err);
    } else {
      const data = {
        user: result
      };
      res.render("profile/profile", data);
    }
  });
});

router.get("/registered", (req, res, next) => {
  res.render("passport/registered.ejs");
});

/// / ----- PROFILE AND EDIT PROFILE ROUTES ---/////

router.get("/profile/:userID", (req, res, next) => {
  res.render("profile/profile");
});

router.get("/edit-profile/:userID", (req, res, next) => {
  res.render("profile/edit-profile");
});

router.post("/edit-profile/:userID", (req, res, next) => {
  console.log(req.user);

  const updatedProfile = {
    phoneNumber: req.body.phoneNumber,
    email: req.body.email,
    address: req.body.address,
    socialMedia: {
      facebook: req.body.facebook,
      instagram: req.body.instagram
    }
  };

  User.findOneAndUpdate({ _id: req.user._id }, updatedProfile, (err, profile) => {
    if (err) {
      next(err);
    } else {
      res.redirect("/profile/:userID");
    }
  });
});

router.get("/profile/:userID", (req, res, next) => {
  User.findOne({ _id: req.user._id }, (err, result) => {
    if (err) {
      next(err);
    } else {
      const data = {
        user: result
      };
      res.render("profile/profile", data);
    }
  });
});

module.exports = router;
