const router = require("express").Router();
const User = require("../Models/User");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const twilio = require('twilio');
const Election = require("../Models/Election");
const Candidate = require("../Models/Candidate");
const Party = require("../Models/Party");
const Vote = require("../Models/Vote");

const client = twilio(process.env.accountSid, process.env.authToken);

// Register
router.post("/register", async (req, res) => {

    const salt = await bcrypt.genSalt(10); //10 is workfactor which determine how much time is needed to calculate a hash
    const hashedPass = await bcrypt.hash(req.body.password, salt);
    const verifyNumber = Math.floor(Math.random() * 1000000).toString().padStart(6, '0')
    const verifyEmail = Math.floor(Math.random() * 1000000).toString().padStart(6, '0')

    const userEmail = await User.findOne({ email: req.body.email }) //This code checks if the email provided is already used.
    if (userEmail) {
        res.status(400).json("This email is already registered") //with status code of 400 which means there was problem with request.
        return; //stops the code from running any further so that it doesn't create a new account with a same email.
    };

    const userPhoneNumber = await User.findOne({ phoneNumber: req.body.contact })
    if (userPhoneNumber) {
        res.status(400).json("This Phone Number is already registered")
        return;
    };

    const userCitizenNumber = await User.findOne({ citizenNumber: req.body.citizennum })
    if (userCitizenNumber) {
        res.status(400).json("This Citizen Number is already registered")
        return;
    };

    try { // used to handle any errors that might occur during the creation of the user object.
        const newUser = new User({ // creates a new user object using the data that is sent through a request body.
            firstName: req.body.fname,
            lastName: req.body.lname,
            email: req.body.email,
            password: hashedPass,
            province: req.body.province,
            phoneNumber: req.body.contact,
            citizenNumber: req.body.citizennum,
            gender: req.body.gender,
            verify_number: verifyNumber,
            verify_email: verifyEmail,
        });
        // After creating the new user, this code saves the user's data to a database using the save() method. 
        await newUser.save(); //await keyword is used to wait for the database operation to complete before proceeding.

        //calls a function named sendVerifyMail() to send a verification email to the user's email address. 
        sendVerifyMail(req.body.fname, req.body.email, verifyEmail)
        sendVerifyPhoneNumber(req.body.contact, "Online Voting System mobile verification code: " + verifyNumber)
        res.status(200).json("Register Successful Please verify Email and Phone Number")
    }
    //catch block handles errors that might occur while saving the user's data to the database.
    catch (err) {
        console.error(err); //it will be logged to the  console.error()
        res.status(500).json({ message: "Error saving user" }) // and a response with a status code of 500 will be sent back to the client.
    }
})

const sendVerifyPhoneNumber = (to, body) => {

    const phoneNumber = '+977' + to;
    console.log(phoneNumber)

    client.messages
        .create({
            body: body,
            to: phoneNumber,
            from: '+16205018096',
        })
        .then(() => {
            console.log("SMS sent successfully")
        })
        .catch((err) => {
            console.log(err)
        });
}

const sendVerifyMail = async (name, email, verifyEmail) => { // asynchronous function called sendVerifyMail()
    try { //try block is used to handle any errors that might occur while creating the mail transport object.
        const transporter = nodemailer.createTransport({ //nodemailer package is used to create a mail transport object 
            host: 'smtp.gmail.com', //that will be used to send the verification email.
            port: 587,
            secure: false,
            requireTLS: true,
            auth: {
                user: process.env.EMAIL,
                pass: process.env.PASSWORD
            }
        });

        const mailOptions = { //mailOptions that contains the details of an email to be sent for verification.
            from: process.env.EMAIL, //from property specifies the email address of the sender
            to: email, //to property specifies the email address of the recipient
            subject: 'For Verfication mail', //subject property specifies the subject of the email which is "For Verification mail".
            html: '<p>Hello ' + name + ',<br/>Online voting system email verification code:' + verifyEmail + '</p>'
        }

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) { ////When the email is sent, the function inside the sendMail() method is called.
                console.log(error)
            } else {
                console.log("Email has been sent:- ", info.response)
            }
        })

    } catch (error) { //catch block logs the error message to the console using console.log(error.message).
        console.log(error.message); //  
    }
}

// Login
router.post("/login", async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email }) //to find a user in the database with the email address provided in the request body.
        if (!user) {
            res.status(400).json("wrong email") //a user exists in the database and responds with an error message if they don't.
            return;
        };
        ////If the password in the request body does not match the password in the database

        const validated = await bcrypt.compare(req.body.password, user.password);
        if (!validated) {
            res.status(400).json("wrong password");
            return;
        }

        const { password, ...others } = user._doc;
        const accessToken = jwt.sign(others, process.env.ACCESS_TOKEN_SECRET)

        res.status(200).json({ accessToken: accessToken })
    } catch (err) {
        res.status(500).json(err)
    }
});
//the generated JWT is stored in a variable called accessToken, which can be used for authentication
// and authorization purposes without exposing the user's password.

// Get data count
router.get("/getDataCount", async (req, res) => {
    try {
        const electionCount = await Election.countDocuments();
        const userCount = await User.countDocuments();
        const candidateCount = await Candidate.countDocuments();
        const partyCount = await Party.countDocuments();

        const dataCount = {
            electionCount,
            userCount,
            candidateCount,
            partyCount
        };

        res.status(200).json(dataCount);
    } catch (error) {
        res.status(500).json(error.message);
    }
});

// Read election with associated data
router.get("/generateReport/:electionName", async (req, res) => {
    try {
        const { electionName } = req.params;

        // Find all votes for the specified election
        const votes = await Vote.find({ election: electionName });

        const electionData = {
            electionName,
            parties: [],
        };

        // Group votes by party
        const votesByParty = {};
        for (const vote of votes) {
            if (!votesByParty[vote.party]) {
                votesByParty[vote.party] = [];
            }
            votesByParty[vote.party].push(vote);
        }

        // Fetch candidate details and vote counts for each party
        const partyNames = Object.keys(votesByParty);
        for (const partyName of partyNames) {
            const party = await Party.findOne({ name: partyName });
            const candidates = [];

            const partyVotes = votesByParty[partyName];
            const processedCandidates = new Set(); // Set to keep track of processed candidates

            for (const vote of partyVotes) {
                const candidate = await Candidate.findById(vote.candidate_id);
                const { name, post } = candidate;
                const candidateKey = `${name}-${post}`; // Generate a unique key for each candidate

                // Check if the candidate with the same name and position has been processed before
                if (!processedCandidates.has(candidateKey)) {
                    const voteCount = partyVotes.filter(
                        (v) => v.candidate_id === vote.candidate_id
                    ).length;

                    candidates.push({ name, position: post, voteCount });
                    processedCandidates.add(candidateKey); // Add the candidate key to the set
                }
            }

            electionData.parties.push({ partyName, candidates });
        }

        res.status(200).json(electionData);
    } catch (error) {
        res.status(500).json(error.message);
    }
});

module.exports = router