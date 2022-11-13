const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  complete: {
    type: Boolean,
    default: false,
  },
  timestamp: {
    type: Date,
    required: true,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Task", taskSchema);
