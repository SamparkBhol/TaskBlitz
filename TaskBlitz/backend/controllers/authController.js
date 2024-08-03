const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/userModel');

exports.register = async (req, res) => {
    const { username, password, role } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, password: hashedPassword, role });
    await user.save();
    res.status(201).send("User registered");
};

exports.login = async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user || !await bcrypt.compare(password, user.password)) {
        return res.status(401).send("Invalid credentials");
    }
    const token = jwt.sign({ userId: user._id, role: user.role }, 'secret_key');
    res.json({ token });
};

exports.authenticateJWT = (req, res, next) => {
    const token = req.header('Authorization');
    if (!token) return res.status(401).send("Access denied");
    try {
        const verified = jwt.verify(token, 'secret_key');
        req.user = verified;
        next();
    } catch (err) {
        res.status(400).send("Invalid token");
    }
};

exports.authorizeRole = (roles) => (req, res, next) => {
    if (!roles.includes(req.user.role)) {
        return res.status(403).send("Forbidden");
    }
    next();
};
