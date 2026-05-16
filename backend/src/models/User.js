const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    firebaseUID: {
      type: String,
      required: true,
      unique: true,
    },

    name: {
      type: String,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    photoURL: {
      type: String,
    },

    location: {
      type: String,
      default: "Unknown",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);