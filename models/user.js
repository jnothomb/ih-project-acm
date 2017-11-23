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
  address: String,
  socialMedia: {
    facebook: String,
    instagram: String
  }
}, {
  timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
});

const User = mongoose.model("User", userSchema);
module.exports = {
  User: User
};
