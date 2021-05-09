const router = require("express").Router();
const userRoutes = require("./user-login-api-route");
//const authenticationRoute = require("./authentication");
const logs = require("../review-api-route");

router.use("/user", userRoutes);
// router.use("/user", authenticationRoute);

router.use("/logs", logs);

module.exports = router;