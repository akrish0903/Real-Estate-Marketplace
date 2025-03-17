const { createClient } = require('redis');
require('dotenv').config();

// For debugging
console.log('Redis URL:', process.env.REDIS_URL);

const redis_client = createClient({
    url: process.env.REDIS_URL || 'rediss://red-csm64r8gph6c73addhgg:za1UCzlG8j4vwJDScNorSd1GJ10tHtRM@singapore-keyvalue.render.com:6379',
    socket: {
        tls: true,
        rejectUnauthorized: false // Add this for development if needed
    }
});

// Event listeners for connection monitoring
redis_client.on("connect", () => console.log("Redis client connecting..."));
redis_client.on("ready", () => console.log("Redis client connected and ready to use"));
redis_client.on("error", (err) => console.error("Redis connection error:", err));
redis_client.on("end", () => console.log("Redis client disconnected"));

// Connect to Redis with error handling
(async () => {
    try {
        await redis_client.connect();
        console.log("Connected to Redis successfully");
    } catch (err) {
        console.error("Error connecting to Redis:", err);
        // Optionally implement retry logic here
    }
})();

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
