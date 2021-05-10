const router = require("express").Router();
const userRoutes = require("./user-login-api-route");
//const authenticationRoute = require("./authentication");
const APILog = require("../APILog");

router.use("/user", userRoutes);
// router.use("/user", authenticationRoute);

router.use("/logs", APILog);

module.exports = router;