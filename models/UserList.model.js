const mongoose = require("mongoose");

const userListSchema = new mongoose.Schema(

  {
    id: {
      type: String
    },
    user: {
      type: mongoose.Schema.Types.ObjectId, ref: 'User'
    },
    name: {
      type: String,
    },
    list: [{
      type: mongoose.Schema.Types.ObjectId, ref: 'User'
    }]
  },
  {
    timestamps: true,
  }
);

const UserList = mongoose.model("UserList", userListSchema);

module.exports = UserList;