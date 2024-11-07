import { createClient } from 'redis';

const client = createClient({
    password: 'YzZGagaY0MGSRwMexynARrwf6bnjzUMO', // Your Redis instance password
    socket: {
        host: 'redis-18923.c301.ap-south-1-1.ec2.redns.redis-cloud.com', // Redis host URL
        port: 18923 // Redis port number
    }
});

// Event listeners for connection monitoring
client.on("connect", () => console.log("Redis client connecting..."));
client.on("ready", () => console.log("Redis client connected and ready to use"));
client.on("error", (err) => console.error("Redis connection error:", err));
client.on("end", () => console.log("Redis client disconnected"));

// Connect to Redis
client.connect()
    .then(() => console.log("Connected to Redis successfully"))
    .catch((err) => console.error("Error connecting to Redis:", err));

process.on("SIGINT", () => {
    client.quit();
    console.log("Redis client disconnected through app termination");
    process.exit(0);
});

export default client;
