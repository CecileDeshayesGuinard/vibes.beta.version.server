const mongoose = require("mongoose");

const eventReqSchema = new mongoose.Schema(

  {
    id: {
      type: String
    },
    event: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event",
      required: true,
    },
    receivers: [
      {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      }
    ]
  },
  {
    timestamps: true,
  }
);

const EventReq = mongoose.model("EventReq", eventReqSchema);

module.exports = EventReq;