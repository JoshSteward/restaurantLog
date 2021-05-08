const router = require("express").Router();
const userRoutes = require("./user-login-api-route");
//const authenticationRoute = require("./authentication");

router.use("/user", userRoutes);
// router.use("/user", authenticationRoute);

module.exports = router;