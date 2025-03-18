const fs = require("fs");

const morgan = require("morgan");
const express = require("express");
const cookieParser = require("cookie-parser");

const mindAgentRouter = require("./routes/mindAgentRoutes");
const AppError = require("./utils/appError");
const globalErrorHandler = require("./controllers/errorController");
const { checkCacheData } = require("./middlewares/cacheMiddleware");
const userRouter = require("./routes/userRoutes");

const cors = require("cors");

const app = express();

// cors setup
app.use(cors({ origin: "http://localhost:5173", credentials: true }));

// Middlewares
if (process.env.NODE_ENV === "development") app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());

// Test Middleware
app.use((req, res, next) => {
  console.log(req.cookies);
  next();
});

// Mounting the Router
app.use(checkCacheData);
app.use("/api/v1/mind-agent", mindAgentRouter);
app.use("/api/v1/users", userRouter);

// app.all() for all the HTTP methods
app.all("*", (req, res, next) => {
  // If next() recieves an argument, express will automatically know that there
  // was an error!
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

// Global Error Handling Middleware
app.use(globalErrorHandler);

module.exports = app;
