require('dotenv').config(); // Load environment variables
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const jobRoutes = require('./routes/jobRoutes');
const applicationRoutes = require('./routes/applicationRoutes');
const messageRoutes = require('./routes/messageRoutes');
const notificationRoutes = require('./routes/notificationRoutes');
const http = require('http'); // Required for Socket.IO
const { setupSocket } = require('./socket');

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Connect to MongoDB
connectDB();

// Routes
app.use('/api/auth', authRoutes);
app.use('/api', userRoutes);
app.use('/api', jobRoutes);
app.use('/api', applicationRoutes);
app.use('/api', messageRoutes);
app.use('/api', notificationRoutes);

// Health check route
app.get('/', (req, res) => {
    res.send('Server is running...');
});

// Create HTTP server for Socket.IO
const server = http.createServer(app);

// Initialize Socket.IO
setupSocket(server);

// Start the server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));