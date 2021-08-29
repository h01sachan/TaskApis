const express = require("express");
const router = express.Router();

//import all routes
const reportRoutes = require("./reportRoutes");

router.use("/report",reportRoutes);

module.exports = router;