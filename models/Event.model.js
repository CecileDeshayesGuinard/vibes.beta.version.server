const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema(

  {   
    id: {
      type: String
    },
    eventPhoto: {
      type: String
    },
    eventName: {
      type: String,
      required: true,
    },
    maker: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    date: {
      from: {
        startingDay: {
          type: String
        },
        startingHour: {
          type: String
        }
      },
      to: {
        endDay: {
          type: String
        },
        endHour: {
          type: String
        }
      }
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
    eventDescription: {
      type: String
    },
    diffusionList: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "UserList",
      }
    ],
    acceptances: [
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







