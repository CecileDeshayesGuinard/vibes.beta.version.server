const mongoose = require("mongoose");

const userReqSchema = new mongoose.Schema(

  {
    id: {
      type: String
    },
    sender: {
      type: mongoose.Schema.Types.ObjectId, ref: 'User',
      required: true,
    },
    receiver: {
      type: mongoose.Schema.Types.ObjectId, ref: 'User',
      required: true,
    }
  },
  {
    timestamps: true,
  }
);

const UserReq = mongoose.model("UserReq", userReqSchema);

module.exports = UserReq;