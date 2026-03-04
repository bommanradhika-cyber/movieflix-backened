const app = require('./app');
const { testConnection } = require('./config/database');
const { createUsersTable } = require('./database/initDb');

const PORT = process.env.PORT || 3000;

// Initialize database on startup
const initApp = async () => {
    try {
        // Test database connection
        const dbConnected = await testConnection();
        if (!dbConnected) {
            console.error('Failed to connect to database. Please check your configuration.');
        } else {
            // Initialize database tables
            const tablesCreated = await createUsersTable();
            if (!tablesCreated) {
                console.error('Failed to initialize database tables.');
            }
        }
    } catch (error) {
        console.error('Failed to initialize:', error);
    }
};

// For Vercel serverless - export the app
if (process.env.VERCEL) {
    // Initialize but don't block
    initApp();
    module.exports = app;
} else {
    // Local development - start server
    const startServer = async () => {
        await initApp();
        
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
            console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
            console.log(`API available at: http://localhost:${PORT}`);
        });
    };

    // Handle uncaught exceptions
    process.on('uncaughtException', (err) => {
        console.error('Uncaught Exception:', err);
        process.exit(1);
    });

    // Handle unhandled promise rejections
    process.on('unhandledRejection', (reason, promise) => {
        console.error('Unhandled Rejection at:', promise, 'reason:', reason);
        process.exit(1);
    });

    startServer();
}
