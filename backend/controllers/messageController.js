const Message = require('../models/Message');

// Get chat history between two users
exports.getChatHistory = async (req, res) => {
    try {
        const { userId } = req.params; // The other user's ID
        const currentUserId = req.user.id;

        const messages = await Message.find({
            $or: [
                { sender: currentUserId, receiver: userId },
                { sender: userId, receiver: currentUserId }
            ]
        }).sort({ createdAt: 1 });

        res.status(200).json({ messages });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};