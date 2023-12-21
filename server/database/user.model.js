const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const UserModel = new Schema({
    e_mail: String,
    userName: String,
    password: String,
    admin: Boolean
});

const UsersModel = model("Users", UserModel);

module.exports = UsersModel;