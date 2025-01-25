const { Server } = require('socket.io');

const users = new Map();

const setupSocket = (server) => {
    const io = new Server(server, {
        cors: {
            origin: '*',
            methods: ['GET', 'POST'],
        },
    });

    io.on('connection', (socket) => {
        console.log(`[Socket.IO] User connected: ${socket.id}`);

        // Handle user joining
        socket.on('join', (userId) => {
            console.log(`[Socket.IO] User joined: ${userId}`);
            if (!users.has(userId)) {
                users.set(userId, []);
            }
            users.get(userId).push(socket.id);
            socket.join(userId);
        });

        // Handle sending messages
        socket.on('sendMessage', ({ senderId, receiverId, message }) => {
            console.log(`[Socket.IO] Message from ${senderId} to ${receiverId}: ${message}`);

            const receiverSockets = users.get(receiverId);
            if (receiverSockets && receiverSockets.length) {
                receiverSockets.forEach(socketId => {
                    io.to(socketId).emit('receiveMessage', {
                        senderId,
                        message,
                    });
                });
                console.log(`[Socket.IO] Message delivered to ${receiverId}`);
            } else {
                console.log(`[Socket.IO] Receiver ${receiverId} not connected`);
            }
        });

        // Handle disconnect
        socket.on('disconnect', () => {
            console.log(`[Socket.IO] User disconnected: ${socket.id}`);
            for (const [userId, socketIds] of users.entries()) {
                const index = socketIds.indexOf(socket.id);
                if (index !== -1) {
                    socketIds.splice(index, 1);
                    if (socketIds.length === 0) {
                        users.delete(userId);
                    }
                    break;
                }
            }
        });
    });
};

module.exports = { setupSocket };