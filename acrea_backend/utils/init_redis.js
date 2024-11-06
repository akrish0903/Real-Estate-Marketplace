const redis = require("redis");

const redisUrl = `redis://${process.env.REDIS_HOST || "127.0.0.1"}:${process.env.REDIS_PORT || 6379}`;
const redis_client = redis.createClient({ url: redisUrl });

redis_client.connect()
  .then(() => console.log("Redis initialized"))
  .catch(err => console.log("Redis connection error:", err));

redis_client.on("connect", () => {
  console.log("Client connected to Redis...");
});

redis_client.on("ready", () => {
  console.log("Client connected to Redis and ready to use...");
});

redis_client.on("error", (err) => {
  console.error("Redis error: ", err);
});

redis_client.on("end", () => {
  console.log("Client disconnected from Redis...");
});

// Graceful shutdown
process.on("SIGINT", () => {
  redis_client.quit();
});

module.exports = redis_client;
