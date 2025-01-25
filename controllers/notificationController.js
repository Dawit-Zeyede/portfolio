const { sendSms } = require('../twilioHelper');
const User = require('../models/User');
const sendEmail = require('../emailHelper');

exports.sendSmsNotification = (phoneNumber, message) => {
    sendSms(phoneNumber, message);
};

exports.sendEmailNotification = (email, subject, message) => {
    sendEmail(email, subject, message);
};

exports.sendUserNotification = async (req, res) => {
    try {
        const { userId, messageType } = req.body;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        let message;

        if (messageType === 'welcome') {
            message = `Hello ${user.name}, welcome to our platform!`;
            this.sendSmsNotification(user.phoneNumber, message);
            this.sendEmailNotification(user.email, 'Welcome!', message);
        }

        res.status(200).json({ message: 'Notification sent successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};