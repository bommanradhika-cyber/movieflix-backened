const { pool } = require('../config/database');

const createUser = async (userData) => {
    const { username, email, phone, password, role = 'USER' } = userData;
    
    const query = `
        INSERT INTO users (username, email, phone, password, role)
        VALUES (?, ?, ?, ?, ?)
    `;
    
    try {
        const [result] = await pool.execute(query, [
            username,
            email,
            phone,
            password,
            role
        ]);
        
        return {
            uid: result.insertId,
            username,
            email,
            phone,
            role
        };
    } catch (error) {
        if (error.code === 'ER_DUP_ENTRY') {
            if (error.message.includes('username')) {
                throw new Error('Username already exists');
            } else if (error.message.includes('email')) {
                throw new Error('Email already exists');
            } else if (error.message.includes('phone')) {
                throw new Error('Phone number already exists');
            }
        }
        throw new Error('Error creating user: ' + error.message);
    }
};

const findUserByUsername = async (username) => {
    const query = 'SELECT * FROM users WHERE username = ?';
    
    try {
        const [rows] = await pool.execute(query, [username]);
        return rows.length > 0 ? rows[0] : null;
    } catch (error) {
        throw new Error('Error finding user: ' + error.message);
    }
};

const findUserByEmail = async (email) => {
    const query = 'SELECT * FROM users WHERE email = ?';
    
    try {
        const [rows] = await pool.execute(query, [email]);
        return rows.length > 0 ? rows[0] : null;
    } catch (error) {
        throw new Error('Error finding user: ' + error.message);
    }
};

const findUserById = async (uid) => {
    const query = 'SELECT uid, username, email, phone, role, created_at FROM users WHERE uid = ?';
    
    try {
        const [rows] = await pool.execute(query, [uid]);
        return rows.length > 0 ? rows[0] : null;
    } catch (error) {
        throw new Error('Error finding user: ' + error.message);
    }
};

module.exports = {
    createUser,
    findUserByUsername,
    findUserByEmail,
    findUserById
};
