const jwt = require('jsonwebtoken');
const User = require('../models/User');
const JWT_SECRET = process.env.JWT_SECRET;

async function authenticate(req, res, next) {
    const token = req.header('Authorization') && req.header('Authorization').split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Access denied. No token provided.' });
    }
    try {
        console.log("token",token);
        const decodedToken = jwt.verify(token, JWT_SECRET);
        console.log("decoded token",decodedToken);
        req.user = decodedToken;
        const user = await User.findById(req.user.id);
        if (!user) return res.status(404).json({ message: 'User not found.' });
        req.userDetails = user;
        next();
    } catch (error) {
        res.status(400).json({message:"Invalid Token"});
    }
} 
module.exports= authenticate;