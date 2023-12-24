const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const app = express();
const port = 8080;
require('dotenv').config();
const connectDB = require("./connection/mongooseConnect");
const passport = require("passport");
require("./middlewares/passport")(passport);

connectDB();

app.use(passport.initialize());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
const corsOptions = {
    origin: "http://localhost:3000",
    credentials: true,
};
app.use(cors(corsOptions));
app.use(cookieParser());

const userRoutes = require("./routes/userRoutes");
const acePokerRoutes = require("./routes/acePokerRoutes");
const jumboPokerRouters = require("./routes/jumboPokerRouter");
app.use('/', userRoutes);
app.use('/', acePokerRoutes);
app.use('/', jumboPokerRouters);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});