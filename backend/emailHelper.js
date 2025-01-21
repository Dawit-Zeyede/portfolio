const nodemailer = require('nodemailer');

// Create a transporter object using default SMTP transport
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER, // Your email address (use environment variables)
        pass: process.env.EMAIL_PASS  // Your email password or app-specific password
    }
});

// Function to send email
const sendEmail = (email, subject, message) => {
    const mailOptions = {
        from: process.env.EMAIL_USER,  // Sender address
        to: email,  // List of recipients
        subject: subject,  // Subject line
        text: message  // Plain text body
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
    });
};

module.exports = sendEmail;