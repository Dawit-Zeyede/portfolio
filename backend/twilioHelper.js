const twilio = require('twilio');

// Twilio credentials from environment variables
const client = new twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN);

// Function to send SMS
const sendSms = (phoneNumber, message) => {
    client.messages.create({
        body: message,
        to: phoneNumber,   // recipient's phone number
        from: process.env.TWILIO_PHONE_NUMBER  // your Twilio phone number
    })
    .then((message) => console.log("SMS sent successfully: ", message.sid))
    .catch((error) => console.error("Failed to send SMS: ", error));
};

module.exports = { sendSms };