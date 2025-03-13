const { setCachedApi } = require("../cache/utils/apiCache");
const catchAsync = require("../utils/catchAsync");
const bent = require("bent");

// Utility function to get the url
const getUrl = (url) => {
  return String(url)
    .split("/")
    [String(url).split("/").length - 1].split("?")[0];
};

exports.getMoodQuotes = catchAsync(async (req, res, next) => {
  // Getting the actual url from req.url
  const cachedUrl = getUrl(req.url);

  // Getting the data from python-api
  const getJSON = bent("json");
  let response0bj = await getJSON("http://localhost:8000/");

  // Mapping the key to the api data
  await setCachedApi(cachedUrl, JSON.stringify(response0bj["data"]));

  // Sending the RESPONSE
  res.status(200).json(response0bj);
});
