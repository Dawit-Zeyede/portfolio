const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { sendSms } = require('../twilioHelper');
exports.register = async (req, res) => {
    try {
        const { name, email, password, phoneNumber, role } = req.body;

        if (!name || !email || !password || !phoneNumber || !role) {
            return res.status(400).json({ message: 'Please provide all required fields (name, email, password, phoneNumber, role)' });
        }

        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: 'User already exists with this email' });
        }

        const newUser = new User({ name, email, password, phoneNumber, role });

        await newUser.save();

        const message = `Hello ${newUser.name}, your account has been successfully created!`;
        sendSms(newUser.phoneNumber, message);

        const { password: _, ...userWithoutPassword } = newUser.toObject();
        res.status(201).json({ message: 'User registered successfully', user: userWithoutPassword });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required' });
        }

        console.log('Login attempt with email:', email);

        const user = await User.findOne({ email });
        if (!user) {
            console.log('User not found with email:', email);
            return res.status(404).json({ error: 'User not found' });
        }

        console.log('User found:', user);

        const enteredPasswordHash = await bcrypt.hash(password.trim(), 10);
        console.log('Entered plain text password:', password.trim());
        console.log('Hashed entered password:', enteredPasswordHash);
        console.log('Stored hashed password:', user.password);

        const isPasswordValid = await bcrypt.compare(password.trim(), user.password);
        console.log('Password comparison result:', isPasswordValid);

        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        console.log('Password is valid for user:', email);

        const jwtSecret = process.env.JWT_SECRET;
        if (!jwtSecret) {
            return res.status(500).json({ error: 'Server configuration error: JWT_SECRET missing' });
        }
        const token = jwt.sign({ id: user._id, role: user.role }, jwtSecret, { expiresIn: '1h' });

        const { password: _, ...userWithoutPassword } = user.toObject();
        res.status(200).json({ token, user: userWithoutPassword });
        
    } catch (error) {
        res.status(500).json({ error: error.message });
        console.error('Error during login:', error);
    }
};