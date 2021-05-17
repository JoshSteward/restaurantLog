const db = require("../../models");
const passport = require("../../config/passport");
//const reviewApiRoute = require("../review-api-route");
const router = require("express").Router();
//const singupController = require("../../controllers/signupController");
const bcrypt = require('bcryptjs');

//authenticate route
router.get("/authenticate", (req, res) => {
    if (req.user) {
        console.log(res)
        return res.json({ isAuthenticated: true, id: req.user.id });
    }
    return res.json({ isAuthenticated: false });
})


// router.post("/login", passport.authenticate("local"), (req, res) => {
//     if (req.user) {
//         console.log(req.user)
//         return res.json({ id: req.user.id, isAuthenticated: true });
//     }
//     return res.json({ isAuthenticated: false });
// });


//passport.authenticate("local", {session:true})
router.post("/login", (req, res, next) => {
    console.log(req.user);
    console.log('tessts')
    console.log(req.body);
    const email = req.body.username.username;
    const password = req.body.username.password

    console.log(email, password);

    db.User
        .findOne({
            where: {
                email: email
            }
        })
        .then(dbUser => {
            console.log('hayaya')
            // If the email does not exist
            if (!dbUser) {
                console.log("Incorrect Email");
                res.json({
                    err: 'Incorrect email'
                })
                
            }
            const hash = dbUser.password.toString();

            return [bcrypt.compare(password, hash), dbUser];
            // If the email exists, validate 
            bcrypt.compare(password, hash, (err, result) => {
                // If the input password is correct
            });
        })
        .then(([result, dbUser]) => {
            req.logIn(dbUser, (err) => {
                if (err) {
                    console.log(err)
                    return res.status(400).json({
                        errors: [{ msg: err }]
                    })
                }
                res.json({
                    data: dbUser,
                });
            })
            return;
            if (result === true) {
                return dbUser;
            }
            // If password is incorrect
            console.log("Incorrect password");
            return false;
        })
        .then(dbUser => {
            //uncomment this later
            // if(!dbUser){
            //     return res.status(422).json({
            //         error: "Cant login",
            //     })
            // }
            
            // req.logIn(dbUser, (err) => {
            //     if (err) {
            //         return res.status(400).json({
            //             errors: [{ msg: err }]
            //         })
            //     }
            //     res.json({
            //         data: user,
            //     });
            // })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err,
            })
        });
    
});
// login route
router.get("/logout", (req, res) => {
    req.logout();
    res.redirect("/login");
})

//get logged in member's data 
router.get("/user_data", (req, res) => {
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

router.get("/users", (req, res) => {
    db.User
})

//create route for signing up 
router.post("/signup", (req, res) => {
    db.User
        .create({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            dob: req.body.dob,
            email: req.body.email,
            password: req.body.password
        })
        .then(() => {
            res.redirect("/login");
        })
        .catch(err => {
            res.status(401).json(err);
        });
});

router.get("/logged-in", (req, res) => {
    res.json({isAuthenticated:req.isAuthenticated()});
    console.log(req.user);
    console.log(req.session);
  });
  
  router.get("/user-id", (req,res) => {
      res.json(req.user);
  })

module.exports = router;

