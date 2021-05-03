// Requiring necessary npm packages
const express = require("express");
const session = require("express-session");
const compression = require("compression");

//require passport
const passport = require("./config/passport");

// Setting up port and requiring models for syncing
const PORT = process.env.PORT || 8080;
const db = require("./models");

// Creating express app and configuring middleware needed for authentication
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// Compress all responses
app.use(compression());

//keep track of login status
app.use(
    session({ secret: "keyboard cat", resave: true, saveUninitialized: true })
);

app.use(passport.initialize());
app.use(passport.session());

//get API routes 
//some still to be added