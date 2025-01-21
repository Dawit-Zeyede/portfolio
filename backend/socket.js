const { Server } = require('socket.io');

// Map to track users by their IDs
const users = new Map();

const setupSocket = (server) => {
    const io = new Server(server, {
        cors: {
            origin: '*', // Allow all origins for testing
            methods: ['GET', 'POST'], // Allow GET and POST methods
        },
    });

    io.on('connection', (socket) => {
        console.log(`[Socket.IO] User connected: ${socket.id}`);

        // Handle user joining
        socket.on('join', (userId) => {
            console.log(`[Socket.IO] User joined: ${userId}`);
            users.set(userId, socket.id); // Map userId to socket ID
        });

        // Handle sending messages
        socket.on('sendMessage', ({ senderId, receiverId, message }) => {
            console.log(`[Socket.IO] Message from ${senderId} to ${receiverId}: ${message}`);
            const receiverSocketId = users.get(receiverId);
            if (receiverSocketId) {
                io.to(receiverSocketId).emit('receiveMessage', {
                    senderId,
                    message,
                });
                console.log(`[Socket.IO] Message delivered to ${receiverId}`);
            } else {
                console.log(`[Socket.IO] Receiver ${receiverId} not connected`);
            }
        });

        // Handle disconnect
        socket.on('disconnect', () => {
            console.log(`[Socket.IO] User disconnected: ${socket.id}`);
            for (const [userId, socketId] of users.entries()) {
                if (socketId === socket.id) {
                    users.delete(userId);
                    break;
                }
            }
        });
    });
};

module.exports = { setupSocket };