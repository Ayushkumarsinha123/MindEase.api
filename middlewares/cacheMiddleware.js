const { getCachedApi } = require("../cache/utils/apiCache");
const catchAsync = require("../utils/catchAsync");

// Cache URLS
const CACHED_URLS = ["get-moods-quotes"];

exports.checkCacheData = catchAsync(async (req, res, next) => {
  // 1) Check if URL is there in cache, if not then proceed with normal request
  const cachedUrl = String(req.url)
    .split("/")
    [String(req.url).split("/").length - 1].split("?")[0];

  if (!CACHED_URLS.includes(cachedUrl)) {
    return next();
  }

  // 2) Now, getting the API data from cache
  const apiData = await getCachedApi(cachedUrl);

  if (apiData) {
    return res
      .status(200)
      .json({ status: "success", data: JSON.parse(apiData) });
  }

  // 3) If no data is retrieved, then move to normal request
  next();
});
