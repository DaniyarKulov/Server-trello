const { Schema, model } = require("mongoose");

const users = new Schema({
  email: { type: String, required: true, unique: true },
  passwrod: { type: String, required: true },
  avatar: { type: String },
});
