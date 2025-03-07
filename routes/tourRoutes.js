const express = require("express");

const tourController = require("./../controllers/tourController");

// Param Middleware (runs only for parameters in url)
// We can take help of this to check any kind of id before delete, update
// or patch request

// Creating a router
const router = express.Router();

router
  .route("/top-5-cheap")
  .get(tourController.aliasTopTours, tourController.getAllTours);

router.route("/tour-stats").get(tourController.getTourStats);

router
  .route("/")
  .get(tourController.getAllTours)
  .post(tourController.createTour);

router
  .route("/:id")
  .get(tourController.getTour)
  .patch(tourController.updateTour)
  .delete(tourController.deleteTour);

module.exports = router;
