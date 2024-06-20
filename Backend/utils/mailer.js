const nodemailer = require('nodemailer');
const dotenv = require('dotenv');

dotenv.config();

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

const sendVerificationEmail = (email, token) => {
    const url = `${process.env.FRONTEND_URL}/verify/${token}`;
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Email Verification',
        text: `Click this link to verify your email: ${url}`,
    };

    return transporter.sendMail(mailOptions);
};

module.exports = sendVerificationEmail;
