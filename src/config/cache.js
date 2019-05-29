import redis from "redis";
import bluebird from "bluebird";

import logger from "./logger";
import { REDIS_URL } from "./secrets";

bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);
class Cache {
  constructor() {
    this.cache = redis.createClient(REDIS_URL);
    this.cache.on("connect", () => {
      logger.info("Redis is connecting...");
    });
    this.cache.on("ready", () => {
      logger.info("Redis connected successfully");
    });
    this.cache.on("reconnecting", () => {
      logger.info("Redis is reconnecting...");
    });
    this.cache.on("error", error => {
      logger.error(`Redis encountered an error because: ${error}`);
    });
    this.cache.on("end", () => {
      logger.info("Redis connection ended");
    });
  }

  async get(key, fetchFunction) {
    const value = await this.cache.getAsync(key);
    if (value) {
      return JSON.parse(value);
    } else {
      return fetchFunction().then(result => {
        this.cache.set(key, JSON.stringify(result));
        return result;
      });
    }
  }

  del(keys) {
    this.cache.delAsync(keys);
  }

  set(key, data) {
    this.cache.setAsync(key, JSON.stringify(data));
  }

  flush() {
    this.cache.flushallAsync();
  }
  async close() {
    this.cache.quit();
  }
}

export default Cache;
