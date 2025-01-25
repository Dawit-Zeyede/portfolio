const twilio = require('twilio');

const client = new twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN);

const sendSms = (phoneNumber, message) => {
    client.messages.create({
        body: message,
        to: phoneNumber,
        from: process.env.TWILIO_PHONE_NUMBER
    })
    .then((message) => console.log("SMS sent successfully: ", message.sid))
    .catch((error) => console.error("Failed to send SMS: ", error));
};

module.exports = { sendSms };