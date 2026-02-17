const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Role = require('../models/Role'); // Needed to populate role if we want to check permissions

exports.verifyToken = (req, res, next) => {
    const token = req.header('Authorization');
    if (!token) return res.status(401).json({ message: 'Access Denied' });

    try {
        const verified = jwt.verify(token.replace('Bearer ', ''), process.env.JWT_SECRET);
        req.user = verified;
        next();
    } catch (err) {
        res.status(400).json({ message: 'Invalid Token' });
    }
};

exports.checkRole = (roles) => {
    return async (req, res, next) => {
        try {
            const user = await User.findById(req.user._id).populate('role');
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            if (roles.includes(user.role.name)) {
                next();
            } else {
                res.status(403).json({ message: 'Access Forbidden' });
            }
        } catch (err) {
            res.status(500).json({ message: 'Internal Server Error' });
        }
    };
};
