require("dotenv").config();
const mongoose = require("mongoose");
const UsersModel = require("../database/user.model");
const bcrypt = require('bcrypt');

const { MONGO_URL, PORT = 8080 , ADMIN_EMAIL, ADMIN_USERNAME, ADMIN_PASSWORD } = process.env;

if (!MONGO_URL) {
    console.error("Missing MONGO_URL environment variable");
    process.exit(1);
}

const populateWithAdmin = async () => {
    try {
        const admin = await UsersModel.findOne({ e_mail: ADMIN_EMAIL });

        if (admin) {
            console.log("Admin already in the database!");
        } else {
            const hashedAdminPassword = await bcrypt.hash(ADMIN_PASSWORD, 10);
            await UsersModel.create({
                e_mail: ADMIN_EMAIL,
                userName: ADMIN_USERNAME,
                password: hashedAdminPassword,
                admin: true
            });
            console.log('Admin created.');
        }
    } catch (error) {
        console.error('Error populating employees:', error);
    }
}

const main = async () => {
    await mongoose.connect(MONGO_URL);
  
    await populateWithAdmin();
  
    await mongoose.disconnect();
};

main().catch((error) => {
    console.error(error);
    process.exit(1);
});
