import { createClient } from "redis";
import dotenv from "dotenv";
dotenv.config()
const redisClient = createClient({
    url: process.env.REDIS_URL,
});

redisClient.on("error", (err) => {
    console.log("Redis Error:", err);
});

try {
    await redisClient.connect();
    console.log("✅ Redis Connected");
} catch (error) {
    console.error("Redis Connection Failed:", error);
}

export default redisClient;