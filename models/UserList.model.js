const { Schema, model } = require("mongoose");

const userListSchema = new Schema(

  {
    id: {
      type: String
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true
    },
    name: {
      type: String,
      required: true,
    },
    list: [
      {type: Schema.Types.ObjectId,
       ref:"User"},
    ]
  },
  {
    timestamps: true,
  }
);

const UserList = model("UserList", userListSchema);

module.exports = UserList;