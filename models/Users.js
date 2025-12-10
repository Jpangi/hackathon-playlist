const mongoose = require("mongoose");
// creates the mongoose model that we will use to access the data
const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

module.exports = mongoose.model("User", UserSchema);
