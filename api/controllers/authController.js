const User = require('../models/User');
const Role = require('../models/Role');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

exports.register = async (req, res) => {
    try {
        // For setup purposes, allowing passing role name. In production, this should be restricted.
        const { name, email, password, roleName } = req.body;

        // Check if user exists
        const emailExist = await User.findOne({ email });
        if (emailExist) return res.status(400).json({ message: 'Email already exists' });

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Find Role
        let role = await Role.findOne({ name: roleName });
        if (!role) {
            // Optional: Create role if it doesn't exist (for seeding/testing)
            // return res.status(400).json({ message: 'Role not found' });
            role = await Role.findOne({ name: 'Student' }); // Default to Student
        }

        const user = new User({
            name,
            email,
            password: hashedPassword,
            role: role._id
        });

        await user.save();
        res.status(201).json({ message: 'User registered successfully' });

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if user exists
        const user = await User.findOne({ email }).populate('role');
        if (!user) return res.status(400).json({ message: 'Email not found' });

        // Check password
        const validPass = await bcrypt.compare(password, user.password);
        if (!validPass) return res.status(400).json({ message: 'Invalid password' });

        // Create token
        const token = jwt.sign({ _id: user._id, role: user.role.name }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.header('Authorization', token).json({ token, role: user.role.name, userId: user._id });

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
