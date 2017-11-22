"use strict";

// -- CREATING ROUTE FOR MANAGE CONTACTS PAGE -- //

const express = require("express");
const router = express.Router();
const ensureLogin = require("connect-ensure-login");
// User model
const User = require("../models/user").User;

//
router.get("/contacts", ensureLogin.ensureLoggedIn(), (req, res, next) => {
  User.findOne({ _id: req.user._id }, (err, result) => {
    if (err) {
      next(err);
    } else {
      const data = {
        userContact: result
      };
      res.render("profile/profile", data);
    }
  });
});

module.exports = router;
