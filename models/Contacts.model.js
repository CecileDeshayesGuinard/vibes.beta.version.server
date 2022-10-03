const { Schema, model } = require("mongoose");

const ContactsSchema = new Schema(

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

const Contacts = model("Contacts", ContactsSchema);

module.exports = Contacts;