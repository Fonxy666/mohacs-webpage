const LocalStrategy = require('passport-local').Strategy;
const User = require("../database/user.model");
const bcrypt = require('bcrypt');

module.exports = (passport) => {
    passport.use(
        new LocalStrategy(async (username, password, done) => {
            try {
                const user = await User.findOne({ username });
                if (!user) {
                    console.log('User not found');
                    return done(null, false);
                }
                const passwordMatch = await comparePasswords(password, user.password);
                if (!passwordMatch) {
                    console.log('Password does not match');
                    return done(null, false);
                }
                console.log('Authentication successful');
                return done(null, user);
            } catch (error) {
                console.error('Error during authentication:', error);
                return done(error);
            }
        })
    );
};

const comparePasswords = async (simplePassword, hashedPassword) => {
    try {
        const result = await bcrypt.compare(simplePassword, hashedPassword);
        if (result) {
            return true;
        } else {
            return false;
        }
    } catch (error) {
        console.error('Error comparing passwords:', error);
        return false;
    }
};