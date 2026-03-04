const validateRegistration = (data) => {
    const { username, email, phone, password } = data;
    const errors = [];

    // Username validation
    if (!username || typeof username !== 'string') {
        errors.push('Username is required');
    } else if (username.length < 3 || username.length > 50) {
        errors.push('Username must be between 3 and 50 characters');
    } else if (!/^[a-zA-Z0-9_]+$/.test(username)) {
        errors.push('Username can only contain letters, numbers, and underscores');
    }

    // Email validation
    if (!email || typeof email !== 'string') {
        errors.push('Email is required');
    } else {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            errors.push('Please provide a valid email address');
        } else if (email.length > 100) {
            errors.push('Email must not exceed 100 characters');
        }
    }

    // Phone validation
    if (!phone || typeof phone !== 'string') {
        errors.push('Phone number is required');
    } else {
        const phoneRegex = /^[\d\s\-\+\(\)]+$/;
        if (!phoneRegex.test(phone)) {
            errors.push('Please provide a valid phone number');
        } else if (phone.length < 10 || phone.length > 20) {
            errors.push('Phone number must be between 10 and 20 characters');
        }
    }

    // Password validation
    if (!password || typeof password !== 'string') {
        errors.push('Password is required');
    } else if (password.length < 8) {
        errors.push('Password must be at least 8 characters long');
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(password)) {
        errors.push('Password must contain at least one uppercase letter, one lowercase letter, and one number');
    }

    return {
        isValid: errors.length === 0,
        errors
    };
};

const validateLogin = (data) => {
    const { username, password } = data;
    const errors = [];

    if (!username || typeof username !== 'string') {
        errors.push('Username is required');
    }

    if (!password || typeof password !== 'string') {
        errors.push('Password is required');
    }

    return {
        isValid: errors.length === 0,
        errors
    };
};

module.exports = {
    validateRegistration,
    validateLogin
};
