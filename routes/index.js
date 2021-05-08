const path = require("path");
//const router = require("express").Router();
const apiRoutes = require("./api");
const express = require('express')
const router = express.Router()

console.log(router);

router.use("/api", apiRoutes);

module.exports = router;