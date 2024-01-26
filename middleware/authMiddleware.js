const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    try {
        
        const token = req.header('Authorization').replace('Bearer ', '');
        
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

        req.user = decoded;
        
        next();
    } catch (error) {
        res.status(401).json({ message: 'Please authenticate.' });
    }
};


module.exports = authMiddleware;
