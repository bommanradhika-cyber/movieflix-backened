const { verifyToken } = require('../utils/auth');
const userModel = require('../models/userModel');

const authenticateToken = async (req, res, next) => {
    try {
        // Get token from cookie or Authorization header
        const token = req.cookies?.token || req.headers['authorization']?.split(' ')[1];

        if (!token) {
            return res.status(401).json({
                success: false,
                message: 'Access denied. No token provided.'
            });
        }

        // Verify token
        const decoded = verifyToken(token);

        // Find user to ensure they still exist
        const user = await userModel.findUserByUsername(decoded.sub);
        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'User not found or token invalid'
            });
        }

        // Attach user info to request object
        req.user = {
            uid: user.uid,
            username: user.username,
            email: user.email,
            role: user.role
        };

        next();
    } catch (error) {
        if (error.message === 'Invalid or expired token') {
            return res.status(403).json({
                success: false,
                message: 'Invalid or expired token'
            });
        }

        console.error('Authentication error:', error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error during authentication'
        });
    }
};

const authorizeRole = (...allowedRoles) => {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(401).json({
                success: false,
                message: 'Authentication required'
            });
        }

        if (!allowedRoles.includes(req.user.role)) {
            return res.status(403).json({
                success: false,
                message: 'Access denied. Insufficient permissions.'
            });
        }

        next();
    };
};

module.exports = {
    authenticateToken,
    authorizeRole
};
