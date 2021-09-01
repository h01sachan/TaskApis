const express = require("express");
var cors = require('cors');
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const morgan = require("morgan");
const config = require('config'); //we load the db location from the JSON files
const { errorHandler } = require("./error/errorHandler");
const api = require("./routes/api");
const app = express();
//db connection
mongoose.connect(config.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

//don't show the log when it is test
if(config.util.getEnv('NODE_ENV') !== 'test') {
    //use morgan to log at command line
    app.use(morgan('combined')); //'combined' outputs the Apache style LOGs
}

app.use(cors());

app.use(express.json());

//ok route
app.get("/", (_req, res) => {
    res.send("OK");
});


app.use("/api", api);

// 404 route.
app.use("*", (_req, res) => {
    res.status(404).json({
        success: false,
        message: "Route not found.",
    });
});

app.use(errorHandler);

app.use("*", (req, res) => {
    res.status(404).json({ success: false, message: "Resource not found" });
});

let PORT = process.env.PORT || 3000;

app.listen(PORT);
console.log("Listening on PORT " + PORT);

module.exports = app; // for testing
