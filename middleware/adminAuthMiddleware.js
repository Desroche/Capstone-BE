const jwt = require('jsonwebtoken');

const requireAdmin = (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '');
        
        if (!token) {
            return res.status(401).json({ error: 'No token provided' });
        }

        const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);

        if (decodedToken.userRole !== 'admin') {
            return res.status(403).json({ error: 'Access denied: requires admin role' });
        }

        req.user = decodedToken; 
        next();
    } catch (error) {
        let errorMessage = 'Please authenticate.';

        if (error instanceof jwt.JsonWebTokenError) {
            errorMessage = 'Invalid token';
        } else if (error instanceof jwt.TokenExpiredError) {
            errorMessage = 'Token expired';
        } else if (error instanceof jwt.NotBeforeError) {
            errorMessage = 'Token not active';
        }

        res.status(401).json({ error: errorMessage });
    }
};

module.exports = requireAdmin;






