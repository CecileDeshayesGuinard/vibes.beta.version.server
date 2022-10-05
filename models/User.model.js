const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(

  {
    id: {
      type: String
    },
    userName: {
      type: String,
      required: true,
      unique: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    phoneNumber: {
      type: String,
    },
    userPhoto: {
      type: String,
      default: 'images/default-avatar.png' // to do
    },
    password: {
      type : String,
      required: true
    },
    contacts: [
      {
        type: mongoose.Schema.Types.ObjectId, ref: 'User'
      }
    ]
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

module.exports = User;