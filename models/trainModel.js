const mongoose = require("mongoose");

const trainSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
    },
    name: {
      type: String,
      required: [true, "name is required"],
    },
    price: {
      type: Number,
      required: [true, "enter price"],
    },
    status: {
      type: String,
      default: "pending",
    },
    timings: {
      type: Object,
      required: [true, "train time is needed"],
    },
  },
  { timestamps: true }
);

const trainModel = mongoose.model("trains", trainSchema);
module.exports = trainModel;
