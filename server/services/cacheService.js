// import { createClient } from 'redis'; // We are commenting this out for now

let redisClient = null; // We will keep this null to disable Redis

/* We are temporarily disabling the connection logic.
(async () => {
    try {
        redisClient = createClient({
            url: process.env.REDIS_URL || 'redis://localhost:6379'
        });
        redisClient.on('error', (err) => console.log('Redis Client Error', err));
        await redisClient.connect();
        console.log('Connected to Redis successfully!');
    } catch (err) {
        console.error("Could not connect to Redis. Caching will be disabled.", err);
        redisClient = null; // Disable caching if connection fails
    }
})();
*/

export async function setCache(key, value, expirationInSeconds) {
    // Caching is disabled, so this function will do nothing.
    if (!redisClient) return; 
    try {
        await redisClient.setEx(key, expirationInSeconds, JSON.stringify(value));
    } catch (err) {
        console.error(`Error setting cache for key: ${key}`, err);
    }
}

export async function getCache(key) {
    // Caching is disabled, so this will always return null.
    if (!redisClient) return null; 
    try {
        const data = await redisClient.get(key);
        return data ? JSON.parse(data) : null;
    } catch (err) {
        console.error(`Error getting cache for key: ${key}`, err);
        return null;
    }
}

