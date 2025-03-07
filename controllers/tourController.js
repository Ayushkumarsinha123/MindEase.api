const AppError = require("../utils/appError");
const Tour = require("./../models/tourModel");
const APIFeatures = require("./../utils/APIFeatures");
const catchAsync = require("./../utils/catchAsync");

exports.aliasTopTours = async (req, res, next) => {
  req.query.limit = "5";
  req.query.sort = "-ratingsAverage,price";
  req.query.fields = "name,price,ratingsAverage,summary,difficulty";
  next();
};

exports.getAllTours = catchAsync(async (req, res, next) => {
  const features = new APIFeatures(Tour.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();

  const tours = await features.query;

  res.status(200).json({
    status: "success",
    results: tours.length,
    data: {
      tours,
    },
  });
});

exports.getTour = catchAsync(async (req, res, next) => {
  const tour = await Tour.findById(req.params.id);

  if (!tour) {
    return next(new AppError("No tour found with that id", 404));
  }

  res.status(200).json({
    status: "success",
    results: tour.length,
    data: {
      tour,
    },
  });
});

exports.createTour = catchAsync(async (req, res, next) => {
  const newTour = await Tour.create(req.body);

  res.status(201).json({ status: "success", data: { tour: newTour } });
});

exports.updateTour = catchAsync(async (req, res, next) => {
  const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!tour) {
    return next(new AppError("No tour found with that id", 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      tour,
    },
  });
});

exports.deleteTour = catchAsync(async (req, res, next) => {
  try {
    const tour = await Tour.findByIdAndDelete(req.params.id);

    if (!tour) {
      return next(new AppError("No tour found with that id", 404));
    }

    res.status(204).json({
      status: "success",
      data: null,
    });
  } catch (error) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
});

exports.getTourStats = catchAsync(async (req, res, next) => {
  // In aggregation, manipulation of data is done in stages, i.e. passed via stages
  const stats = await Tour.aggregate([
    {
      // Stage 1
      // match is just like filter
      $match: { ratingsAverage: { $gte: 4.5 } },
    },
    {
      // Stage 2
      // group allows to group documents together using accumulators
      $group: {
        // _id is used to specify what we're gonna group by ( null : to have
        // everything, all the documents, in one group )
        _id: "$difficulty",
        numTours: { $sum: 1 },
        numRatings: { $sum: "$ratingsQuantity" },
        avgRating: { $avg: "$ratingsAverage" },
        avgPrice: { $avg: "$price" },
        minPrice: { $min: "$price" },
        maxPrice: { $max: "$price" },
      },
    },
    {
      $sort: { avgPrice: 1 },
    },
  ]);

  res.status(200).json({
    status: "success",
    data: {
      stats,
    },
  });
});
