const router = require("express").Router();
const passport = require("passport");
const db = require("../../models");

let returnData = {};

router.get('/user', (req, res) => {
    
    console.log("\nRequest Session")
    console.log(req.session)
    if (req.isAuthenticated()) {
        var currentUser = req.session.passport.user;
        console.log("\nCurrent User")
        console.log(currentUser)
        db.User.findOne({
            where: {
                id: currentUser 
            }
        }).then(dbUser => {
            console.log("User")
            console.log(dbUser)
            let user = {
                loggedIn: true,
                user: currentUser,
            };
            res.json(user);
        })

    } else {
        let noUser = {
            loggedIn: false,
            user: ''
        };
        res.json(noUser);
    }
})

router.post("/login", (req, res, next) => {
    passport.authenticate("local-login", (err, user) => {
        if (err) return next(err)

        if (!user) {
            returnData = {
                message: "User not found",
                color: 'red'
            }
            res.json(returnData)
        }

        req.login(user, (err) => {
            console.log("\nUser");
            console.log(user)

            returnData = {
                message: "User successfully logged in",
                color: "green"
            }

            return res.json(returnData)
        })
    })(req, res, next)
})

router.post("/signup", (req, res, next) => {
    console.log("Hit signup Route")
    console.log(req.body)

    passport.authenticate("local-signup", (err, user) => {
        if (err) return next(err)

        if (!user) {
            console.log("User exists");
            returnData = {
                message: "User Exists",
                color: "red"
            }
            return res.json(returnData)
        }

        if (user) {
            console.log("\nUser created");
            returnData = {
                message: "User Created",
                color: "green"
            }
            res.json(returnData)
        }
    })(req, res, next)
})

router.get("/logout", (req, res) => {

    req.logout()
    if (!req.user) {
        res.redirect("/")
    } else {
        console.log("Failed Logout")
    }
})


module.exports = router;