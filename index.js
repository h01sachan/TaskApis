const express = require("express");
var cors = require('cors');
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const morgan = require("morgan");
dotenv.config({ path: "./.env" });
const { errorHandler } = require("./error/errorHandler");
const api = require("./routes/api");
const app = express();
app.use(morgan("tiny"));

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

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
}).then(() => {
    console.log("connected to database")
    app.listen(PORT);
    console.log("server is running on port " + PORT);
}).catch((err) => {
    console.log(err);
});
