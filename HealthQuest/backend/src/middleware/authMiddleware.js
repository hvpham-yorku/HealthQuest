const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
        return res.status(401).json({ message: "No token provided" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.id; // Attach user ID to request object
        next();
    } catch (error) {
        console.error('Authentication error:', error.message);
        res.status(401).json({ message: "Invalid token" });
    }
};

module.exports = verifyToken;
