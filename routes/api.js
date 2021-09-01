const express = require("express");
const router = express.Router();

//import all routes
const reportRoutes = require("./report");

router.use("/report",reportRoutes);

module.exports = router;