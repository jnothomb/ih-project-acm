"use strict";

const express = require("express");
const router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  if (req.isAuthenticated()) {
    res.render("index", {
      title: "your_ACM",
      loggedIn: true
    });
  } else {
    res.render("index", {
      title: "your_ACM",
      loggedIn: false
    });
  }
});
module.exports = router;
