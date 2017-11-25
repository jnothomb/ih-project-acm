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
        users: result,
        searchResult: null
      };
      res.render("profile/contacts", data);
    }
  });
});

router.post("/contacts/search", ensureLogin.ensureLoggedIn(), (req, res, next) => {
  const search = req.body.contactSearch;
  const query = { $or: [{ firstName: { $regex: search, $options: "i" } }, { lastName: { $regex: search, $options: "i" } }, { email: { $regex: search, $options: "i" } }, { city: { $regex: search, $options: "i" } }, { cohortCity: { $regex: search, $options: "i" } }, { cohortYear: { $regex: search, $options: "i" } }] };
  User.find(query, (err, searchResult) => {
    if (err) {
      next(err);
    } else {
      User.find({}, (err, users) => {
        if (err) {
          next(err);
        } else {
          const data = {
            searchResult: searchResult,
            users: null
          };
          res.render("profile/contacts", data);
        }
      });
    }
  });
});

module.exports = router;
