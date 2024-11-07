const { createClient } = require('redis');

const redis_client = createClient({
    url: 'rediss://red-csm64r8gph6c73addhgg:za1UCzlG8j4vwJDScNorSd1GJ10tHtRM@singapore-redis.render.com:6379', // Redis connection URL
    socket: {
        tls: true // Enable TLS
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
