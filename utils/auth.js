const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const SALT_ROUNDS = 12;

const hashPassword = async (password) => {
    try {
        const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
        return hashedPassword;
    } catch (error) {
        throw new Error('Error hashing password: ' + error.message);
    }
};

const comparePassword = async (password, hashedPassword) => {
    try {
        const isMatch = await bcrypt.compare(password, hashedPassword);
        return isMatch;
    } catch (error) {
        throw new Error('Error comparing passwords: ' + error.message);
    }
};

const generateToken = (username, role) => {
    try {
        const payload = {
            sub: username,
            role: role
        };

        const token = jwt.sign(payload, process.env.JWT_SECRET, {
            algorithm: 'HS256',
            expiresIn: process.env.JWT_EXPIRES_IN || '24h'
        });

        return token;
    } catch (error) {
        throw new Error('Error generating token: ' + error.message);
    }
};

const verifyToken = (token) => {
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET, {
            algorithms: ['HS256']
        });
        return decoded;
    } catch (error) {
        throw new Error('Invalid or expired token');
    }
};

const getCookieOptions = () => {
    const isProduction = process.env.NODE_ENV === 'production';
    
    return {
        httpOnly: true,
        secure: isProduction,
        sameSite: 'strict',
        maxAge: 24 * 60 * 60 * 1000, // 24 hours in milliseconds
        path: '/'
    };
};

module.exports = {
    hashPassword,
    comparePassword,
    generateToken,
    verifyToken,
    getCookieOptions
};
