const mongoose = require("mongoose");
const dbURL = "mongodb://127.0.0.1:27017/swaggerTutorial";

mongoose.connect(dbURL); // Connect to MongoDB

const db = mongoose.connection; // Get the default connection

db.on("error", console.error.bind(console, "Error in connecting database:")); // Bind error event (logs to console)
db.once("open", () => {
    console.log("Database is connected"); // Once connected, log success message
});
