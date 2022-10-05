const mongoose = require("mongoose");

const ContactsSchema = new mongoose.Schema(

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
    list: [
      {type: Schema.Types.ObjectId,
       ref: "User"},
    ]
  },
  {
    timestamps: true,
  }
);

const Contacts = mongoose.model("Contacts", ContactsSchema);

module.exports = Contacts;