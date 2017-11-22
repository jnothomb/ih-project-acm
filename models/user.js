"use strict";

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: String,
  password: String,
  firstName: String,
  lastName: String,
  phoneNumber: String, // STRING OR NUMBER???
  email: String,
  address: String,
  socialMedia: {
    facebook: String,
    instagram: String
  },
  contacts: {
    user_id: Number
  }
}, {
  timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
});

const User = mongoose.model("User", userSchema);
module.exports = {
  User: User
};
