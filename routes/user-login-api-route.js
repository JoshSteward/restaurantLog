const db = require("../models");
const passport = require("../config/passport");

module.exports = function(app) {
    //login route
    app.post("/api/login", passport.authenticate("local"), (req,res) => {
        res.json(req.user);
    });

    //get logged in member's data 
    app.get("/api/user_data", (req,res) => {
        //if no user logged inthen send back an empty object otherwise send back data
        if (!req.user) {
            res.json({
                isLoggedIn: false
            });
        } else {
            const userName = req.user.firstName + " " + req.user.lastName";
            res.json({
                isLoggedIn: true,
                userName: userName, 
                authorId: req.user.id
            }).
        }
    });

    //create route for signing up 
}