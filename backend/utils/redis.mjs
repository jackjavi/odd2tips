import { createClient } from "redis";
import { promisify } from "util";

const RedisClient = class RedisClient {
  constructor() {
    this.myClient = createClient({
      url: process.env.REDIS_URL,
      legacyMode: true,
    });
    this.myClient.on("error", (error) => {
      console.error("Redis Error:", error);
    });
  }

  isAlive() {
    return this.myClient.connected;
  }

  async get(key) {
    try {
      const getAsync = promisify(this.myClient.GET).bind(this.myClient);
      return await getAsync(key);
    } catch (error) {
      throw new Error(`Redis GET error: ${error}`);
    }
  }

  async set(key, val, time) {
    try {
      const setAsync = promisify(this.myClient.SET).bind(this.myClient);
      return await setAsync(key, val, "EX", time);
    } catch (error) {
      throw new Error(`Redis SET error: ${error}`);
    }
  }

  async del(key) {
    try {
      const delAsync = promisify(this.myClient.DEL).bind(this.myClient);
      return await delAsync(key);
    } catch (error) {
      throw new Error(`Redis DEL error: ${error}`);
    }
  }
};

const redisClient = new RedisClient();

export default redisClient;
