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
      type: String 
    },
    password: {
      type : String,
      required: true
    }
  },
  {
    timestamps: true,
  }
);

const User = model("User", userSchema);

module.exports = User;