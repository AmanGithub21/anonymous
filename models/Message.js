const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const messageSchema = Schema({
  message: {
    type: String,
  },
});

module.exports = mongoose.model("Message", messageSchema);
