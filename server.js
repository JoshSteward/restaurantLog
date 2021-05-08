// Requiring necessary npm packages
const express = require("express");
const session = require("express-session");
const compression = require("compression");
const routes = require("./routes");

//require passport
const passport = require("./config/passport");

// Setting up port and requiring models for syncing
const PORT = process.env.PORT || 8080;
const db = require("./models");
db.userLogs.hasMany(db.user, {foreignKey: "userId"})
db.user.belongsTo(db.userLogs);

// Creating express app and configuring middleware needed for authentication
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// Compress all responses
app.use(compression());

//set up session  
const sess = {
  secret: "secret",
  resave: false, 
  saveUninitialized: false,
};

app.use(session(sess));

//keep track of login status
//app.use(
//    session({ secret: "keyboard cat", resave: true, saveUninitialized: true })
//);

app.use(passport.initialize());
app.use(passport.session());

//get API routes 
//some still to be added e.g. html-routes
//require("./routes/review-api-route")(app);
//require("./routes/api/user-login-api-route")(router);
app.use("/", routes);

const path = require("path")
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

db.sequelize.sync().then(() => {
    app.listen(PORT, () => {
      console.log(
        "Listening on port %s. Visit http://localhost:%s/ in your browser.",
        PORT,
        PORT
      );
    });
});