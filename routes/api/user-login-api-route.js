const db = require("../../models");
const passport = require("../../config/passport");
//const reviewApiRoute = require("../review-api-route");
const router = require("express").Router();
//const singupController = require("../../controllers/signupController");


//authenticate route
router.get("/authenticate", (req,res) => {
    if (req.user) {
        console.log(res)
        return res.json({isAuthenticated: true, id: req.user.id});
    }
    return res.json({isAuthenticated: false});
})

/*
app.post("/api/login", passport.authenticate("local"), (req,res) => {
    if (req.user) {
        console.log(req.user)
        return res.json({id: req.user.id, isAuthenticated: true});
    }
    return res.json({isAuthenticated: false});
});
*/ 

//passport.authenticate("local", {session:true})
router.post("/login", (req,res) => {
    return res.json(req.user);
});
//login route
router.get("/logout", (req,res) => {
    req.logout();
    res.redirect("/login");
})

//get logged in member's data 
router.get("/user_data", (req,res) => {
    //if no user logged in then send back an empty object otherwise send back data
    if (!req.user) {
        res.json({
            isLoggedIn: false
        });
    } else {
        const userName = req.user.firstName + " " + req.user.lastName;
        res.json({
            isLoggedIn: true,
            userName: userName, 
            authorId: req.user.id
        });
    }
});

router.get("/users", (req,res) => {
    db.user
})

//create route for signing up 
router.post("/authenticate/signup", (req,res) => {
    db.user
    .create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        dob: req.body.dob,
        email: req.body.email,
        password: req.body.password
    })
    .then(() => {
        res.redirect("/profile");
    })
    .catch(err => {
        res.status(401).json(err);
    });
});

module.exports = router; 

