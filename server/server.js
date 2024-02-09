const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const port = 8080;
require('dotenv').config();
const connectDB = require("./connection/mongooseConnect");
const passport = require("passport");
require("./middlewares/passport")(passport);
const https = require('https');
const path = require('path');
const fs = require('fs');
const app = express();

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
const newsRoutes = require("./routes/newsRoutes");
const acePokerRoutes = require("./routes/acePokerRoutes");
const jumboPokerRouters = require("./routes/jumboPokerRouter");
app.use('/', userRoutes);
app.use('/', newsRoutes);
app.use('/', acePokerRoutes);
app.use('/', jumboPokerRouters);

const sslServer = https.createServer({
    key: fs.readFileSync(path.join(__dirname, 'cert', 'key.pem')),
    cert: fs.readFileSync(path.join(__dirname, 'cert', 'cert.pem')),
    minVersion: 'TLSv1.2',
    ciphers: 'TLS_AES_128_GCM_SHA256:TLS_AES_256_GCM_SHA384',
}, app);

sslServer.listen(3443, () => console.log(`Secure server on port 3443`));