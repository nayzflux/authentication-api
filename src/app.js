const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const csurf = require("csurf");
const MongoStore = require(`connect-mongo`);

const authRoutes = require("./routes/auth.routes");
const userRoutes = require("./routes/user.routes");

const app = express();

// require("dotenv").config({ path: ".ENV" });
require("./database/mongodb");

app.enable("trust proxy");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session(
    {
        secret: process.env.SESSION_SECRET,
        cookie: { maxAge: 30 * 24 * 60 * 60 * 1000, expires: 30 * 24 * 60 * 60 * 1000, httpOnly: true, secure: true },
        saveUninitialized: false,
        resave: false,
        store: MongoStore.create({ mongoUrl: process.env.MONGO_URL })
    }
));

app.use("/api/v1/auth", csurf({ cookie: true }), authRoutes);
app.use("/api/v1/users", csurf({ cookie: true }), userRoutes);

// get an csrf token
app.get("/api/v1/csrf", csurf({ cookie: true }), (req, res) => {
    res.status(200).json({ csrfToken: req.csrfToken() });
});

app.listen((process.env.PORT || 80), () => console.log("Serveur démarré sur le port : " + (process.env.PORT || 80) + "."));