const { Schema, model } = require("mongoose");

const userReqSchema = new Schema(

  {
    id: {
      type: String
    },
    sender: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    receiver: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    userList: [
      {
      type: Schema.Types.ObjectId,
      ref: "UserList",
      }
    ],
    acceptance: {
      type: Boolean 
    }
  },
  {
    timestamps: true,
  }
);

const UserReq = model("UserReq", userReqSchema);

module.exports = UserReq;