require('dotenv').config(); // Load environment variables
const { createClient } = require('redis');

const redis_client = createClient({
    password: process.env.REDIS_PASSWORD, // Use Redis password from .env
    socket: {
        host: process.env.REDIS_HOST, // Use Redis host from .env
        port: process.env.REDIS_PORT // Use Redis port from .env
    }
});

// Event listeners for connection monitoring
redis_client.on("connect", () => console.log("Redis client connecting..."));
redis_client.on("ready", () => console.log("Redis client connected and ready to use"));
redis_client.on("error", (err) => console.error("Redis connection error:", err));
redis_client.on("end", () => console.log("Redis client disconnected"));

// Connect to Redis
redis_client.connect()
    .then(() => console.log("Connected to Redis successfully"))
    .catch((err) => console.error("Error connecting to Redis:", err));

// Graceful shutdown
process.on("SIGINT", () => {
    redis_client.quit();
    console.log("Redis client disconnected through app termination");
    process.exit(0);
});

module.exports = redis_client;
