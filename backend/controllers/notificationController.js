const { sendSms } = require('../twilioHelper');  // Twilio helper to send SMS
const User = require('../models/User');
const sendEmail = require('../emailHelper'); // Your custom email helper (if needed)

// Send SMS Notification
exports.sendSmsNotification = (phoneNumber, message) => {
    sendSms(phoneNumber, message);  // Sends SMS via Twilio
};

// Send Email Notification (Example)
exports.sendEmailNotification = (email, subject, message) => {
    sendEmail(email, subject, message);  // Sends an email (you'll need to implement this helper)
};

// Example of a generic notification handler
exports.sendUserNotification = async (req, res) => {
    try {
        const { userId, messageType } = req.body;

        // Find the user from the database
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        let message;

        // Determine the type of notification
        if (messageType === 'welcome') {
            message = `Hello ${user.name}, welcome to our platform!`;
            this.sendSmsNotification(user.phoneNumber, message); // SMS notification
            this.sendEmailNotification(user.email, 'Welcome!', message); // Email notification
        }

        res.status(200).json({ message: 'Notification sent successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};