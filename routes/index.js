const path = require("path");
//const router = require("express").Router();
const apiRoutes = require("./api");
const express = require('express')
const router = express.Router()

console.log(router);

router.use("/api", apiRoutes);

router.use(function(req, res) {
    console.log("no route hit")
    res.sendFile(path.join(__dirname, "../client/build/index.html"));
  });
  

module.exports = router;