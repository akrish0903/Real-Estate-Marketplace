const { createClient } = require('redis');
require('dotenv').config();

let redis_client;

try {
    // Create Redis client with configuration from environment variables
    redis_client = createClient({
        url: process.env.REDIS_URL,
        socket: {
            tls: true,
            rejectUnauthorized: false
        }
    });

    // Event listeners for connection monitoring
    redis_client.on("connect", () => console.log("Redis client connecting..."));
    redis_client.on("ready", () => console.log("Redis client connected and ready to use"));
    redis_client.on("error", (err) => {
        console.error("Redis Client Error:", err);
        redis_client.isReady = false;
    });
    redis_client.on("end", () => {
        console.log("Redis client disconnected");
        redis_client.isReady = false;
    });

    // Connect to Redis
    redis_client.connect().catch(err => {
        console.error("Initial Redis connection failed:", err);
        redis_client.isReady = false;
    });

} catch (error) {
    console.error("Redis client creation error:", error);
    // Create a dummy client that uses memory storage
    redis_client = {
        isReady: false,
        setEx: async () => {},
        get: async () => null,
        del: async () => {},
        connect: async () => {}
    };
}

// Graceful shutdown
process.on("SIGINT", async () => {
    try {
        if (redis_client.quit) {
            await redis_client.quit();
        }
        console.log("Redis client disconnected through app termination");
        process.exit(0);
    } catch (err) {
        console.error("Error during Redis shutdown:", err);
        process.exit(1);
    }
});

module.exports = redis_client;
