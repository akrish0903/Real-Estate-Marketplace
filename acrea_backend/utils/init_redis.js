const redis = require("redis");

let redis_client;
try {
    redis_client = redis.createClient({
        socket: {
            host: process.env.REDIS_HOST,
            port: process.env.REDIS_PORT,
            family: 4,
        },
    });
    redis_client.connect()
        .then(() => console.log("Redis connected"))
        .catch((err) => console.log("Redis connection failed: ", err));
} catch (error) {
    console.error("Redis initialization failed:", error);
}

module.exports = redis_client;
