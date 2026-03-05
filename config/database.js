const mysql = require('mysql2/promise');
require('dotenv').config();

const dbConfig = {
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'movieflix',
    port: process.env.DB_PORT || 3306,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    enableKeepAlive: true,
    keepAliveInitialDelay: 0,
    // SSL configuration for cloud databases like Aiven
    ssl: process.env.DB_SSL === 'true' ? {
        rejectUnauthorized: false
    } : undefined
};

const pool = mysql.createPool(dbConfig);

const testConnection = async () => {
    try {
        const connection = await pool.getConnection();
        console.log('Database connected successfully');
        connection.release();
        return true;
    } catch (error) {
        console.error('Database connection failed:', error.message);
        console.error('DB_HOST:', process.env.DB_HOST);
        console.error('DB_PORT:', process.env.DB_PORT);
        console.error('DB_USER:', process.env.DB_USER);
        console.error('DB_NAME:', process.env.DB_NAME);
        console.error('DB_SSL:', process.env.DB_SSL);
        return false;
    }
};

module.exports = {
    pool,
    testConnection
};
