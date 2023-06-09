const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");

dotenv.config();
app.use(express.json());

// code to connect to mongodb
mongoose.connect(process.env.MONGO_URL)
    .then(console.log("Connect to mongodb"))
    .catch(console.log((err) => console.log(err)));

const authroutes = require("./routes/auth");
const usersroutes = require("./routes/user");
const partyroutes = require("./routes/party");
const candidateroutes = require("./routes/candidate");
const electionroutes = require("./routes/election");
const voteroutes = require("./routes/vote");

app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));
app.use("/api/auth", authroutes)
app.use("/api/user", usersroutes)
app.use("/api/party", partyroutes)
app.use("/api/candidate", candidateroutes)
app.use("/api/election", electionroutes)
app.use("/api/vote", voteroutes)

app.use(express.static('public'));
// Get image url
app.get("/uploads/:imageName", async (req, res) => {
    const imageName = req.params.imageName;
    res.sendFile(`${__dirname}/uploads/${imageName}`);
});

app.listen("5000", () => {
    console.log("Backend is running.")
});
