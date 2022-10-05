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
    contacts: [
      [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}]
    ],
    password: {
      type : String,
      match: "^(?=.*[0-9])(?=.*[az])(?=.*[AZ])(?=.*[@#$%^&-+=() ])(?=\\S+$).{8, 15}$",
      required: true
    }
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

module.exports = User;