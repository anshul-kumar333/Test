const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  fatherName: { type: String, required: true }, // Add father's name
  batchTiming: { type: String, required: true }, // Add batch timing
});

module.exports = mongoose.model('User', userSchema);
