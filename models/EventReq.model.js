const { Schema, model } = require("mongoose");

const eventReqSchema = new Schema(

  {
    id: {
      type: String
    },
    event: {
      type: Schema.Types.ObjectId,
      ref: "Event",
      required: true,
    },
    receivers: [
      {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
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

const EventReq = model("eventReq", eventReqSchema);

module.exports = EventReq;