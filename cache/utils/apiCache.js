const client = require("../createRedisClient");
const { apiCacheKey } = require("./keys");

exports.getCachedApi = (route) => {
  return client.get(apiCacheKey(route));
};

exports.setCachedApi = (route, apiData) => {
  client.set(apiCacheKey(route), apiData, { EX: 43200 });
};
