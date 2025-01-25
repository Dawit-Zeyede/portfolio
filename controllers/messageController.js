const Message = require('../models/Message');
const User = require('../models/User');

exports.getChatHistory = async (req, res) => {
    try {
        const { userId } = req.params;
        const currentUserId = req.user.id;

        const messages = await Message.find({
            $or: [
                { sender: currentUserId, receiver: userId },
                { sender: userId, receiver: currentUserId }
            ]
        }).sort({ createdAt: 1 });

        return res.status(200).json({ messages });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: error.message });
    }
};

exports.sendMessage = async (req, res) => {
    try {
        const { studentId } = req.params;
        const { message } = req.body;
        const fromEmployerId = req.user.id;

        const student = await User.findById(studentId);
        if (!student) {
            return res.status(404).json({ success: false, message: 'Student not found' });
        }

        const newMessage = new Message({
            sender: fromEmployerId,
            receiver: studentId,
            content: message,
            createdAt: new Date(),
        });

        await newMessage.save();

        res.status(200).json({ success: true, message: 'Message sent successfully.' });

        const receiverSocketId = req.app.io.sockets.adapter.rooms.get(studentId);
        if (receiverSocketId) {
            req.app.io.to(studentId).emit('newMessage', {
                senderId: fromEmployerId,
                content: message,
            });
            console.log(`[Socket.IO] Message delivered to ${studentId}`);
        } else {
            console.log(`[Socket.IO] Receiver ${studentId} not connected`);
        }

    } catch (err) {
        console.error(err);
        if (!res.headersSent) {
            res.status(500).json({ success: false, message: 'Failed to send message.' });
        }
    }
};