const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema(

  {   
    id: {
      type: String
    },
    eventName: {
      type: String,
      required: true,
    },
    maker: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    date: {
      from: {
        day: {
          type: String
        },
        hour: {
          type: String
        }
      },
      to: {
        day: {
          type: String
        },
        hour: {
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
        type: Schema.Types.ObjectId,
        ref: "UserList",
      }
    ]
    || 
    {
      type: Schema.Types.ObjectId,
      ref: "UserContacts",
    },
    acceptance: {
      type: Boolean 
    }
  }, 
  {
    timestamps: true,
  }

);

const Event = mongoose.model("Event", eventSchema);

module.exports = Event;







