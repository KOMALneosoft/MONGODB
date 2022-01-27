const mongoose = require("mongoose");
const RegisterSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  mobile: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  // company_name: {
  //   type: String,
  //   required: true,
  // },
  // company_address: {
  //   type: String,
  //   required: true,
  // },
  // company_logo: {
  //   type: String,
  //   required: true,
  // },
  date: {
    type: Date,
    default: Date.now,
  },
});
module.exports = mongoose.model("register", RegisterSchema);
