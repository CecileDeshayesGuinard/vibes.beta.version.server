const mongoose = require("mongoose");

const ContactsSchema = new mongoose.Schema(

  {
    id: {
      type: String
    },
    user: {
      type: mongoose.Schema.Types.ObjectId, ref: 'User',
      required: true,
      unique: true
    },
    relations: [
      {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
      },
    ]
  },
  {
    timestamps: true,
  }
);

const Contacts = mongoose.model("Contacts", ContactsSchema);

module.exports = Contacts;