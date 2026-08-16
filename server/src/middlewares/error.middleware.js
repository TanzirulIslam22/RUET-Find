import { env } from "../config/env.js";

const errorHandler = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;

  console.error("Error:", err.message);

  if (err.name === "CastError") {
    error = { statusCode: 400, message: "Resource not found" };
  }

  if (err.code === 11000) {
    error = { statusCode: 409, message: "Duplicate field value entered" };
  }

  if (err.name === "ValidationError") {
    const message = Object.values(err.errors)
      .map((val) => val.message)
      .join(", ");
    error = { statusCode: 400, message };
  }

  if (err.name === "JsonWebTokenError") {
    error = { statusCode: 401, message: "Invalid token" };
  }

  if (err.name === "TokenExpiredError") {
    error = { statusCode: 401, message: "Token expired" };
  }

  res.status(error.statusCode || 500).json({
    success: false,
    message: error.message || "Internal Server Error",
    errors: error.errors || [],
  });
};

export default errorHandler;
