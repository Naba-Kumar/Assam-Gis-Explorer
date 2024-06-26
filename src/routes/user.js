const express = require('express');
const router = express.Router();
const twilio = require('twilio');
const nodemailer = require('nodemailer');
require('dotenv').config();
const bodyParser = require('body-parser');
const pool = require('../db/connection');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const validator = require('validator')
const {phone} = require('phone');





router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));


// import { v4 as uuidv4 } from 'uuid';





// Initialize Twilio client
// const accountSid = 'YOUR_TWILIO_ACCOUNT_SID';
// const authToken = 'YOUR_TWILIO_AUTH_TOKEN';
// const twilioClient = twilio(accountSid, authToken);
// const twilioPhoneNumber = 'YOUR_TWILIO_PHONE_NUMBER';
// // Initialize Nodemailer transporter
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.email,
        pass: process.env.appw
    }
});

// // const registrations = {};


router.get('/', (req, res) => {
    res.render("userRegister");

});



// ------Register route starts
// const storage = multer.memoryStorage(); // Store files in memory


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)) // Appending extension
    }
});

const upload = multer({ storage: storage });

// const storage = multer.memoryStorage(); // Store files in memory
// const upload = multer({ dest: 'uploads/' }); // Configure multer to save files to 'uploads/' directory


router.post('/', upload.single('id_proof'), async (req, res) => {

    const actions = "Register"

    const action = req.body.submit;
    const data = req.body.data;
    console.log("------------------")

    console.log(process.env.email)
    console.log("------------------")

    console.log(process.env.appw)
    console.log("------------------")

    // console.log(req.body.email)
    console.log("--------")
    // console.log(req.body.action)


    // console.log(req.body)
    console.log("------------------")

    // Check which button was clicked based on its value
    if (action === "GetOTP") {
        console.log("click getopt")
        // Handle action 1
        const email = req.body.email;

        try {

            if (validator.isEmail(email)) {


                // Generate OTP (random 6-digit number)
                const otp = Math.floor(100000 + Math.random() * 900000);

                const client = await pool.poolUser.connect();
                await client.query(`INSERT INTO emailotp (email, otp) VALUES ($1, $2)`, [email, otp]);
                client.release();



                // Send OTP via email
                await transporter.sendMail({
                    from: process.env.email,
                    to: req.body.email,
                    subject: 'OTP for Registration AGISE',
                    text: `Your OTP for Registration ASSAM GIS EXPLORER is: ${otp}`
                });

                const data = { message: 'OTP sent successfully' };
                res.status(500).send('<script>alert("' + data.message + '");window.location.href = window.location.href;</script>');


            } else {

                const data = { message: 'Please enter valid email' };
                res.status(500).send('<script>alert("' + data.message + '");window.location.href = window.location.href;</script>');

            }
        } catch (err) {
            console.error('Error in sending OTP via email:', err);
            res.status(500).send({ error: 'Internal Server Error' });
        }
    }

    else if (action === 'Verify') {
        console.log("click verify")

        // Handle action 2
        try {
            // const { email_address} = req.body;
            const email = req.body.email;
            const clientotp = req.body.otp;


            // Retrieve stored OTP and session ID from the database
            const client = await pool.poolUser.connect();
            const result = await client.query(`SELECT otp FROM emailotp WHERE email = $1`, [email]);
            // console.log(result.rows);
            // console.log(result.rows[0]);
            // console.log();
            const dbotp = result.rows[0].otp;
            const storedOtp = dbotp.toString();
            console.log(`REsult - ${result}`)

            client.release();

            console.log(`client otp - ${typeof (clientotp)}`)
            console.log(`stored otp - ${typeof (storedOtp)}`)

            console.log(`client otp - ${clientotp}`)
            console.log(`stored otp - ${storedOtp}`)



            if (clientotp === storedOtp) {

                const client = await pool.poolUser.connect();
                const result = await client.query(`INSERT INTO verifiedemails (email) VALUES ($1)`, [email]);
                // const storedOtp = result.rows[0].otp;
                // await client.query('DELETE FROM emailotp WHERE EMAIL = $1', [email]);
                // client.release();
                // res.status(200).send({ message: 'OTP verified successfully' });

                const data = { message: 'OTP verified successfully' };
                res.status(200).send('<script>alert("' + data.message + '");window.location.href = window.location.href;</script>');


            } else {
                const data = { message: 'Invalid OTP' };
                res.status(200).send('<script>alert("' + data.message + '");window.location.href = window.location.href;</script>');

                // res.status(400).send({ error: 'Invalid OTP' });
            }
        } catch (err) {
            const data = { message: 'Somthing Went Wrong' };
            res.status(500).send('<script>alert("' + data.message + '");window.location.href = window.location.href;</script>');

            console.error('Error in OTP verification:', err);
            // res.status(500).send({ error: 'Internal Server Error' });
        }

    }

    else if (actions === 'Register') {
        console.log("click Register")
        console.log(req.body.id_proof)

        console.log(req.body)



        const {
            first_name,
            last_name,
            mobile,
            organization,
            department,
            designation,
            email,
            user_type,
            about,
            password
        } = req.body;

        if(phone(req.body.mobile, {country: 'IND'})){
            res.status(500).send('Something not Went Wrong!');


        }else{
            res.status(500).send('Something sure Went Wrong!');

        }

        // Get file data
        console.log(req.file.path)
        const id_proof = fs.readFileSync(req.file.path);

        // const id_proof = req.file.buffer; // This will contain the file buffer

        // const imageBuffer = fs.readFileSync('path/to/your/image.jpg')

        // Assuming id_proof is a bytea column in your PostgreSQL database
        try {
            // Insert data into PostgreSQL database
            const query = `
                INSERT INTO registered ( first_name, last_name, mobile, organization, department, designation, email, user_type, about, password, id_proof)
                VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
            `;
            const values = [
                first_name,
                last_name,
                mobile,
                organization,
                department,
                designation,
                email,
                user_type,
                about,
                password,
                id_proof
            ];

            const client = await pool.poolUser.connect();


            await client.query(query, values);

            client.release();
            const data = { message: 'Registered successfully' };
            res.status(200).send('<script>alert("' + data.message + '");window.location.href = window.location.href;</script>');
        } catch (error) {
            console.error('Error inserting data:', error);
            res.status(500).send('Something Went Wrong!');

        }
        // res.status(400).send('Verify OTP First');

    }
});

// ------Register route ends




router.get('/login', (req, res) => {
    // Your OpenLayers logic here
    res.render("userLogin");

});
router.post('/logn', (req, res) => {
    // Your OpenLayers logic here
    // res.render("login");

});

router.get('/forgot', (req, res) => {
    // Your OpenLayers logic here
    res.render("userForgot");

});
router.post('/forgot', (req, res) => {
    // Your OpenLayers logic here
    // res.render("query");

});


module.exports = router;
