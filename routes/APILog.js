const db = require("../models");
const userLogs = require("../models/userLogs");
const router = require("express").Router();


module.exports = function(router) {
    //generate route to get the previous user's logs 
    router.get("/userLogs", (req,res) => {
        console.log(res);
        db.userLogs
        .findAll({})
        .then(dbuserLogs => res.json(dbuserLogs));
    });
    console.log(router);
    //route for creating new user logs 
    router.post("/add_log", (req,res) => {
        db.userLogs
        .create({
            title: req.body.logTitle,
            log: req.body.logReview,
            items: req.body.logItems,
            rating: req.body.rating,
            authorId: req.body.authorId
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
            title: req.body.logTitle,
            log: req.body.logReview,
            items: req.body.logItems,
            rating: req.body.rating,
            authorId: req.body.authorId
        }, 
        {
            where: {
                id: req.body.id
            }
        })
        .then(dbuserLogs => res.json(dbuserLogs))
        .catch(err => res.json(err));
    });
};