const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema(

  {   
    id: {
      type: String
    },
    photo: {
      type: String
    },
    name: {
      type: String,
      required: true,
    },
    maker: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    startAt: {
      type: String,
      required: true
    },
    endAt: {
      type: String,
      required: true
    },
    location: {
      streetName: {
        type: String,
        required: true
      },
      streetNumber: {
        type: String,
      },
      zipCode: {
        type: String,
        required: true
      },
      cityName: {
        type: String,
        required: true
      },
      countryName: {
        type: String,
        required: true
      }
    },
    description: {
      type: String
    },
    guest: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "UserList",
      }
    ],
    confirmed: [
      {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      }
    ]
  }, 
  {
    timestamps: true,
  }

);

const Event = mongoose.model("Event", eventSchema);

module.exports = Event;







