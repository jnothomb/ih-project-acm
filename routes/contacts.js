"use strict";

// -- CREATING ROUTE FOR MANAGE CONTACTS PAGE -- //

const express = require("express");
const router = express.Router();
const ensureLogin = require("connect-ensure-login");
// User model
const User = require("../models/user").User;

//
router.get("/contacts", ensureLogin.ensureLoggedIn(), (req, res, next) => {
  User.find({}, (err, result) => {
    if (err) {
      next(err);
    } else {
      const data = {
        users: result
      };
      res.render("profile/contacts", data);
    }
  });
});

module.exports = router;
