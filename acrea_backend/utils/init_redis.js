const { createClient } = require('redis');
require('dotenv').config();

// For debugging
console.log('Redis URL:', process.env.REDIS_URL);

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
            console.log('Redis connection refused, retrying...');
            return Math.min(options.attempt * 100, 3000);
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
    if (err.code === 'ECONNREFUSED') {
        console.log('Redis connection refused, will retry automatically...');
    } else {
        console.error("Redis connection error:", err);
    }
});
redis_client.on("end", () => console.log("Redis client disconnected"));
redis_client.on("reconnecting", () => console.log("Redis client reconnecting..."));

// Connect to Redis with error handling and retry
let retries = 5;
const connect = async () => {
    while (retries) {
        try {
            await redis_client.connect();
            console.log("Connected to Redis successfully");
            break;
        } catch (err) {
            console.error(`Failed to connect to Redis. Retries left: ${retries}`);
            retries -= 1;
            // Wait for 2 seconds before retrying
            await new Promise(resolve => setTimeout(resolve, 2000));
        }
    }
    if (!retries) {
        console.error("Failed to connect to Redis after multiple retries");
        process.exit(1);
    }
};

connect().catch(console.error);

// Graceful shutdown
process.on("SIGINT", async () => {
    try {
        await redis_client.quit();
        console.log("Redis client disconnected through app termination");
        process.exit(0);
    } catch (err) {
        console.error("Error during shutdown:", err);
        process.exit(1);
    }
});

module.exports = redis_client;
