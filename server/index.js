const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");

dotenv.config();
app.use(express.json());

// code to connect to mongodb
mongoose.connect(process.env.MONGO_URL)
.then(console.log("Connect to mongodb"))
.catch(console.log((err) => console.log(err)));

const authroutes = require("./routes/auth");
const usersroutes = require("./routes/user");

app.use("/api/auth", authroutes)
app.use("/api/user", usersroutes)

app.listen("5000", () => {
    console.log("Backend is running.")
});
