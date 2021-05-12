const db = require("../models");
const userLogs = require("../models/userLogs");
const router = require("express").Router();


    //generate route to get the previous user's logs 
    router.route("/userLogs").get((req,res) => {
        console.log("Working");
        db.userLogs
        .findAll({})
        .then(dbuserLogs => res.json(dbuserLogs));
    });
    //route for creating new user logs 
    router.post("/add_log", (req,res) => {
        db.userLogs
        .create({
            locationName: req.body.locationName,
            location: req.body.location,
            menuItems: req.body.menuItems,
            thoughts: req.body.thoughts,
            //authorId: req.body.authorId
        })
        .then(() => res.status(200))
        .catch(err => {
            res.status(401).json(err);
        });
    });

    //route to delete logs based on specific ID
    router.delete("/userLogs:id", (req,res) => {
        db.userLogs
        .destroy({
            where: {
                id: req.params.id
            }
        })
        .then(dbuserLogs => res.json(dbuserLogs));
    });

    //route to edit logs 
    router.put("/userLogs/:id", (req,res) => {
        db.userLogs
        .update({
            locationName: req.body.locationName,
            location: req.body.location,
            menuItems: req.body.menuItems,
            thoughts: req.body.thoughts,
            //authorId: req.body.authorId
        }, 
        {
            where: {
                id: req.body.id
            }
        })
        .then(dbuserLogs => res.json(dbuserLogs))
        .catch(err => res.json(err));
    });

module.exports = router; 