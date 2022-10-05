const { Schema, model } = require("mongoose");

const userSchema = new Schema(

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
      match: "^(?=.*[0-9])(?=.*[az])(?=.*[AZ])(?=.*[@#$%^&-+=() ])(?=\\S+$).{8, 15}$",
      required: true
    }
  },
  {
    timestamps: true,
  }
);

const User = model("User", userSchema);

module.exports = User;