// Requiring necessary npm packages
const express = require("express");
const session = require("express-session");
const compression = require("compression");
const routes = require("./routes");
const cors = require("cors");



//require passport
const passport = require("./config/passport");
//const passport = require("passport");

// Setting up port and requiring models for syncing
const PORT = process.env.PORT || 8080;
const db = require("./models");
// db.User.hasMany(db.User, {foreignKey: "userId"})
// db.userLogs.belongsTo(db.userLogs);

// Creating express app and configuring middleware needed for authentication
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// app.use(express.static("public"));
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}



// Compress all responses
app.use(compression());

//set up session  
const sess = {
  secret: "secret",
  resave: false, 
  saveUninitialized: false,
};

app.use(cors({
  credentials: true,
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}));


app.use(session(sess));

//keep track of login status
//app.use(
//    session({ secret: "keyboard cat", resave: true, saveUninitialized: true })
//);
app.use(
  session({
    secret: "keyboard cat", 
    resave: false,
    saveUninitialized: false, 
    // Custom store to allow us to store the session in a database so if page is refreshed or backend crashes we can still retrieve the user session. This only works for mongo. For sequelize, you would use this https://www.npmjs.com/package/connect-session-sequelize
  })
);


app.use(passport.initialize());
app.use(passport.session());


// app.get('/', (req, res) => {
//   res.send("WELCOME TO RESTAURANT LOG!");
// });

//get API routes 
//some still to be added e.g. html-routes
//require("./routes/review-api-route")(app);
//require("./routes/api/user-login-api-route")(router);

const path = require("path");
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

app.use("/", routes);





db.sequelize.sync().then(() => {
    app.listen(PORT, () => {
      console.log(
        "Listening on port %s. Visit http://localhost:%s/ in your browser.",
        PORT,
        PORT
      );
    });
});