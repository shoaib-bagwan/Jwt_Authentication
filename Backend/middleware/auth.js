const jwt = require('jsonwebtoken');
const auth = (req, res, next) => {
    const authHeader = req.headers.authorization;
    const JWT_KEY = "shoaib123";
    if (!authHeader) {
        return res.status(401).json({ message: "No token provided" });
    }
    const token=authHeader.split(" ")[1];
    
    if (!token) {
        return res.status(401).json({ message: "no token provided" })
    }
    try {
        const decoded = jwt.verify(token, JWT_KEY);
        req.user = decoded;
        next();
    } catch (e) {
        res.status(401).json({ message: "Invalid or expired token" })
    }
}
module.exports = auth;