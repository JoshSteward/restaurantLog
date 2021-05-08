const path = require("path");
//const router = require("express").Router();
const apiRoutes = require("./api");
const express = require('express')
const router = express.Router()

console.log(router);
router.use("/api", apiRoutes);

//react app 
router.use(function(req, res) {
  res.sendFile(path.join(__dirname, "../client/public.index.html"));
  //console.log(res);
});

module.exports = router;