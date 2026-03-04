const userModel = require('../models/userModel');
const { validateRegistration, validateLogin } = require('../utils/validation');
const { hashPassword, comparePassword, generateToken, getCookieOptions } = require('../utils/auth');

const register = async (req, res) => {
    try {
        // Validate input
        const validation = validateRegistration(req.body);
        if (!validation.isValid) {
            return res.status(400).json({
                success: false,
                message: 'Validation failed',
                errors: validation.errors
            });
        }

        const { username, email, phone, password } = req.body;

        // Check if user already exists
        const existingUserByUsername = await userModel.findUserByUsername(username);
        if (existingUserByUsername) {
            return res.status(409).json({
                success: false,
                message: 'Username already exists'
            });
        }

        const existingUserByEmail = await userModel.findUserByEmail(email);
        if (existingUserByEmail) {
            return res.status(409).json({
                success: false,
                message: 'Email already exists'
            });
        }

        // Hash password
        const hashedPassword = await hashPassword(password);

        // Create user with default role USER
        const user = await userModel.createUser({
            username,
            email,
            phone,
            password: hashedPassword,
            role: 'USER'
        });

        // Return success response (201 Created)
        return res.status(201).json({
            success: true,
            message: 'User registered successfully',
            data: {
                uid: user.uid,
                username: user.username,
                email: user.email,
                phone: user.phone,
                role: user.role
            }
        });

    } catch (error) {
        console.error('Registration error:', error);
        
        if (error.message.includes('already exists')) {
            return res.status(409).json({
                success: false,
                message: error.message
            });
        }

        return res.status(500).json({
            success: false,
            message: 'Internal server error during registration'
        });
    }
};

const login = async (req, res) => {
    try {
        // Validate input
        const validation = validateLogin(req.body);
        if (!validation.isValid) {
            return res.status(400).json({
                success: false,
                message: 'Validation failed',
                errors: validation.errors
            });
        }

        const { username, password } = req.body;

        // Find user by username
        const user = await userModel.findUserByUsername(username);
        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'Invalid credentials'
            });
        }

        // Compare passwords
        const isPasswordValid = await comparePassword(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({
                success: false,
                message: 'Invalid credentials'
            });
        }

        // Generate JWT token with username as subject and role as claim
        const token = generateToken(user.username, user.role);

        // Set JWT as HTTP-only, secure cookie with SameSite protection
        const cookieOptions = getCookieOptions();
        res.cookie('token', token, cookieOptions);

        // Return success response
        return res.status(200).json({
            success: true,
            message: 'Login successful',
            data: {
                uid: user.uid,
                username: user.username,
                email: user.email,
                phone: user.phone,
                role: user.role
            }
        });

    } catch (error) {
        console.error('Login error:', error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error during login'
        });
    }
};

const logout = async (req, res) => {
    try {
        // Clear the token cookie
        res.clearCookie('token', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            path: '/'
        });

        return res.status(200).json({
            success: true,
            message: 'Logout successful'
        });
    } catch (error) {
        console.error('Logout error:', error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error during logout'
        });
    }
};

const getProfile = async (req, res) => {
    try {
        const user = await userModel.findUserById(req.user.uid);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        return res.status(200).json({
            success: true,
            data: user
        });
    } catch (error) {
        console.error('Get profile error:', error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
};

module.exports = {
    register,
    login,
    logout,
    getProfile
};
