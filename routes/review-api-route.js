const db = require("../models");
const userLogs = require("../models/userLogs");

module.exports = function(app) {
    //generate route to get the previous user's logs 
    app.get("/api/userLogs", (req,res) => {
        db.userLogs
        .findAll({})
        .then(dbuserLogs => res.json(dbuserLogs));
    });

    //route for creating new user logs 
    app.post("/api/add_log", (req,res) => {
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
    app.delete("/api/userLogs:id", (req,res) => {
        db.userLogs
        .destroy({
            where: {
                id: req.params.id
            }
        })
        .then(dbuserLogs => res.json(dbuserLogs));
    });

    //route to edit logs 
    app.put("api/userLogs/:id", (req,res) => {
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