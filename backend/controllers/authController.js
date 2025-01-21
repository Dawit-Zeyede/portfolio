const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { sendSms } = require('../twilioHelper');  // Twilio helper to send SMS

// Register
exports.register = async (req, res) => {
    try {
        const { name, email, password, phoneNumber, role } = req.body;

        // Validate input data
        if (!name || !email || !password || !phoneNumber || !role) {
            return res.status(400).json({ message: 'Please provide all required fields (name, email, password, phoneNumber, role)' });
        }

        // Check if the user already exists
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: 'User already exists with this email' });
        }

        // Create new user
        const newUser = new User({ name, email, password, phoneNumber, role });

        // Hash the password before saving it
        const salt = await bcrypt.genSalt(10);
        newUser.password = await bcrypt.hash(password, salt);

        // Save the user
        await newUser.save();

        // Send SMS after registration
        const message = `Hello ${newUser.name}, your account has been successfully created!`;
        sendSms(newUser.phoneNumber, message);  // Send SMS using Twilio

        // Respond with user details excluding the password
        const { password: _, ...userWithoutPassword } = newUser.toObject();
        res.status(201).json({ message: 'User registered successfully', user: userWithoutPassword });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Login
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validate if the input is present
        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required' });
        }

        // Check if the user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Validate the password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        // Create JWT token
        const jwtSecret = process.env.JWT_SECRET;
        if (!jwtSecret) {
            return res.status(500).json({ error: 'Server configuration error: JWT_SECRET missing' });
        }
        const token = jwt.sign({ id: user._id, role: user.role }, jwtSecret, { expiresIn: '1h' });

        // Respond with the token and user details excluding password
        const { password: _, ...userWithoutPassword } = user.toObject();
        res.status(200).json({ token, user: userWithoutPassword });
        
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};