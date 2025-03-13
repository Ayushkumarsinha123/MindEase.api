const express = require("express");
const mindAgentController = require("./../controllers/mindAgentController");

// Param Middleware (runs only for parameters in url)
// We can take help of this to check any kind of id before delete, update
// or patch request

// Creating a router
const router = express.Router();

router.route("/").get();
router.get("/get-moods-quotes", mindAgentController.getMoodQuotes);

module.exports = router;
