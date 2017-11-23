"use strict";

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  profileImg: String,
  username: String,
  password: String,
  firstName: String,
  lastName: String,
  phoneNumber: String,
  email: String,
  country: String,
  city: String,
  cohortYear: Number,
  cohortCity: String,
  socialMedia: {
    facebook: String,
    linkedin: String,
    pinterest: String
  }
}, {
  timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
});

const User = mongoose.model("User", userSchema);
module.exports = {
  User: User
};
