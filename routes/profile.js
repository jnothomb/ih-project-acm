"use strict";

const express = require("express");
const router = express.Router();

// User model
const User = require("../models/user").User;

router.get("/registered", (req, res, next) => {
  res.render("passport/registered.ejs");
});

/// / ----- PROFILE AND EDIT PROFILE ROUTES ---/////

router.get("/profile/:userID", (req, res, next) => {
  const userId = req.params.userID;
  User.findOne({ _id: userId }, (err, result) => {
    if (err) {
      next(err);
    } else {
      const data = {
        usr: result
      };
      res.render("profile/profile", data);
    }
  });
});

router.get("/edit-profile/:userID", (req, res, next) => {
  const userId = req.params.userID;
  User.findOne({ _id: userId }, (err, result) => {
    if (err) {
      next(err);
    } else {
      if (!req.user._id.equals(result._id)) {
        res.redirect(`/profile/${userId}`);
      } else {
        const data = {
          usr: result
        };
        res.render("profile/edit-profile", data);
      }
    }
  });
});

router.post("/edit-profile/:userID", (req, res, next) => {
  const userId = req.params.userID;

  const updatedProfile = {
    profileImg: req.body.profileImg,
    phoneNumber: req.body.phoneNumber,
    email: req.body.email,
    city: req.body.city,
    country: req.body.country,
    cohortYear: req.body.cohortYear,
    cohortCity: req.body.cohortCity,

    socialMedia: {
      facebook: req.body.facebook,
      linkedin: req.body.linkedin,
      pinterest: req.body.pinterest

    }
  };

  if (!req.user._id.equals(result._id)) {
    res.redirect(`/profile/${userId}`);
  } else {
    User.findOneAndUpdate({ _id: userId }, updatedProfile, (err, profile) => {
      if (err) {
        next(err);
      } else {
        res.redirect(`/profile/${userId}`);
      }
    });
  }
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
