const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const UserModel = new Schema({
    e_mail: String,
    username: String,
    password: String,
    role: String
});

const UsersModel = model("Users", UserModel);

module.exports = UsersModel;