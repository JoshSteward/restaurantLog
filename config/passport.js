const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");
const db = require("../models");

//signing into / signing up for user profile using email 
passport.use(
  new LocalStrategy(
    {
      usernameField: "username",
      passwordField: 'password',
    },
    (email, password, done) => {
      console.log('local stragey');
      //check to see if user exists 
      db.user
        .findOne({
          where: {
            email: email
          }
        })
        .then(dbUser => {
          // If the email does not exist
          if (!dbUser) {
            console.log("Incorrect Email");
            return done(null, false, {
              message: "Incorrect email."
            });
          }
          const hash = dbUser.password.toString();

          // If the email exists, validate 
          bcrypt.compare(password, hash, (err, result) => {
            // If the input password is correct
            if (result === true) {
              return done(null, dbUser);
            }
            // If password is incorrect
            console.log("Incorrect password");
            return done(null, false, {
              message: "Incorrect password."
            });
          });
        });
    }
  )
);

//use sequalize to serialize and deserialize user 
passport.serializeUser((user, cb) => {
  cb(null, user);
});

passport.deserializeUser((obj, cb) => {
  cb(null, obj);
});

// Export passport 
module.exports = passport;


