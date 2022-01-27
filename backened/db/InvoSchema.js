const mongoose = require("mongoose");
const invoSchema = new mongoose.Schema({
  invono: {
    type: Number,
    required: true,
    unique: true,
  },
  idate: {
    type: String,
    required: true,
  },
  ddate: {
    type: String,
    required: true,
  },
  shipping: {
    type: Array,
    required: true,
  },
  items: { type: Array, required: true },
  ftotal: { type: Number, required: true },
  paid: { type: String, required: true },
});
module.exports = mongoose.model("Invoice", invoSchema);
