const express = require("express");
// const session = require("express-session");
const logger = require("morgan");
const cors = require("cors");

const mongoose = require("mongoose");
const routes = require("./routes");

const app = express();
const PORT = process.env.PORT || 3001;

// middleware
app.use(logger("dev"));
app.use(cors({}));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// app.use(session({ secret: "keyboard cat", save: true, saveUnitialized: true }));

// serve up static assets
if (process.env.NODE_ENV === "production") {
    app.use(express.static("./client/build"));
}

app.use(routes);

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/as-scholarship");

app.listen(PORT, () => {
    console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});