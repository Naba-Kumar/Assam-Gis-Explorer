const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const twilio = require('twilio');
const nodemailer = require('nodemailer');

// Initialize Twilio client
// const accountSid = 'YOUR_TWILIO_ACCOUNT_SID';
// const authToken = 'YOUR_TWILIO_AUTH_TOKEN';
// const twilioClient = twilio(accountSid, authToken);
// const twilioPhoneNumber = 'YOUR_TWILIO_PHONE_NUMBER';
// // Initialize Nodemailer transporter
// const transporter = nodemailer.createTransport({
//     service: 'gmail',
//     auth: {
//         user: 'YOUR_EMAIL_ADDRESS',
//         pass: 'YOUR_EMAIL_PASSWORD'
//     }
// });

router.use(bodyParser.urlencoded({ extended: true }));
const registrations = {};


router.get('/', (req, res) => {
    res.render("userRegister");

});

// router.post('/getotp', (req, res) => {
//     try {
//         const { email_address } = req.body;

//         // Generate OTP (random 6-digit number)
//         const otp = Math.floor(100000 + Math.random() * 900000);

//         // Generate session ID
//         const sessionId = uuid.v4();

//         // Save OTP and session ID to the database
//         const client = await pool.connect();
//         await client.query('INSERT INTO otps (email_address, otp) VALUES ($1, $2)', [email_address, otp]);
//         client.release();

//         // Send OTP via email
//         await transporter.sendMail({
//             from: 'YOUR_EMAIL_ADDRESS',
//             to: email_address,
//             subject: 'OTP for Registration',
//             text: `Your OTP for registration is: ${otp}`
//         });

//         res.status(200).send({ message: 'OTP sent successfully', sessionId });
//     } catch (err) {
//         console.error('Error in sending OTP via email:', err);
//         res.status(500).send({ error: 'Internal Server Error' });
//     }
// });


// router.post('/varifyotp', (req, res) => {
//     // const { otp } = req.body;
//     // session ID check here
//     try {
//         const { email_address, otp } = req.body;

//         // Retrieve stored OTP and session ID from the database
//         const client = await pool.connect();
//         const result = await client.query('SELECT otp, session_id FROM otps WHERE email_address = $1', [email_address]);
//         const storedOtp = result.rows[0].otp;
//         const sessionId = result.rows[0].session_id;
//         client.release();

//         if (otp === storedOtp) {
//             res.status(200).send({ message: 'OTP verified successfully', sessionId });
//         } else {
//             res.status(400).send({ error: 'Invalid OTP' });
//         }
//     } catch (err) {
//         console.error('Error in OTP verification:', err);
//         res.status(500).send({ error: 'Internal Server Error' });
//     }

// });


// ------Register route starts

router.post('/register', async (req, res) => {

    const action = req.body.action;
    const data = req.body.data;

    // Check which button was clicked based on its value
    if (action === 'getotp') {
        // Handle action 1
        try {
            const { email_address } = req.body;

            // Generate OTP (random 6-digit number)
            const otp = Math.floor(100000 + Math.random() * 900000);

            // Generate session ID
            const sessionId = uuid.v4();

            // Save OTP and session ID to the database
            const client = await pool.connect();
            await client.query('INSERT INTO otps (email_address, otp) VALUES ($1, $2)', [email_address, otp]);
            client.release();

            // Send OTP via email
            await transporter.sendMail({
                from: 'YOUR_EMAIL_ADDRESS',
                to: email_address,
                subject: 'OTP for Registration',
                text: `Your OTP for registration is: ${otp}`
            });

            res.status(200).send({ message: 'OTP sent successfully', sessionId });
        } catch (err) {
            console.error('Error in sending OTP via email:', err);
            res.status(500).send({ error: 'Internal Server Error' });
        }
        console.log('Action 1 triggered with data:', data);
    }

    else if (action === 'varify') {
        // Handle action 2
        try {
            const { email_address, otp } = req.body;

            // Retrieve stored OTP and session ID from the database
            const client = await pool.connect();
            const result = await client.query('SELECT otp FROM otps WHERE email_address = $1', [email_address]);
            const storedOtp = result.rows[0].otp;
            client.release();

            if (otp === storedOtp) {
                res.status(200).send({ message: 'OTP verified successfully', sessionId });
            } else {
                res.status(400).send({ error: 'Invalid OTP' });
            }
        } catch (err) {
            console.error('Error in OTP verification:', err);
            res.status(500).send({ error: 'Internal Server Error' });
        }

    }

    else if (action === 'register') {
        try {
            const { email_address } = req.body;
            const result = await client.query('SELECT otp FROM otps WHERE email_address = $1', [email_address]);
            if(result  && req.sessionId==sessionId){

            }



        }catch{

        }

        // Handle action 2
        console.log('Action 2 triggered with data:', data);
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
