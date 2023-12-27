const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const UserModel = new Schema({
    e_mail: String,
    username: String,
    password: String,
    role: String
}, {versionKey: false});

const UsersModel = model("Users", UserModel, "Users");

module.exports = UsersModel;