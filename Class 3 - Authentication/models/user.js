const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    user_name: String,
    email: String,
    contact: String,
    password: String,
    confirm_password: String,
})

const userModel = mongoose.model("user", userSchema);

module.exports = userModel;