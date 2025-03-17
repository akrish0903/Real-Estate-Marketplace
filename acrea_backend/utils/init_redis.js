const { createClient } = require('redis');
require('dotenv').config();

// Create Redis client with configuration from environment variables
const redis_client = createClient({
    url: process.env.REDIS_URL,
    socket: {
        tls: true,
        rejectUnauthorized: false
    },
    // Add retry strategy
    retry_strategy: function(options) {
        if (options.error && options.error.code === 'ECONNREFUSED') {
            // End reconnecting on a specific error
            return new Error('The server refused the connection');
        }
        if (options.total_retry_time > 1000 * 60 * 60) {
            // End reconnecting after a specific timeout
            return new Error('Retry time exhausted');
        }
        if (options.attempt > 10) {
            // End reconnecting with built in error
            return undefined;
        }
        // Reconnect after
        return Math.min(options.attempt * 100, 3000);
    }
});

// Event listeners for connection monitoring
redis_client.on("connect", () => console.log("Redis client connecting..."));
redis_client.on("ready", () => console.log("Redis client connected and ready to use"));
redis_client.on("error", (err) => {
    console.error("Redis Client Error:", err);
    // Don't crash on connection error
});
redis_client.on("end", () => console.log("Redis client disconnected"));

// Connect to Redis with retry logic
const connectRedis = async () => {
    try {
        if (!redis_client.isReady) {
            await redis_client.connect();
            console.log("Connected to Redis successfully");
        }
    } catch (err) {
        console.error("Failed to connect to Redis:", err);
        // Retry connection after 5 seconds
        setTimeout(connectRedis, 5000);
    }
};

// Initial connection attempt
connectRedis();

// Graceful shutdown
process.on("SIGINT", async () => {
    try {
        await redis_client.quit();
        console.log("Redis client disconnected through app termination");
        process.exit(0);
    } catch (err) {
        console.error("Error during Redis shutdown:", err);
        process.exit(1);
    }
});

module.exports = redis_client;
