import jwt from "jsonwebtoken";
import { env } from "../config/env.js";
import User from "../modules/auth/auth.model.js";
import ApiError from "../utils/ApiError.js";

export const protect = async (req, res, next) => {
  try {
    const token =
      req.cookies?.accessToken ||
      req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      throw ApiError.unauthorized("Not authorized, please login");
    }

    const decoded = jwt.verify(token, env.JWT_SECRET);
    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      throw ApiError.unauthorized("User not found");
    }

    req.user = user;
    next();
  } catch (error) {
    next(ApiError.unauthorized("Not authorized, please login"));
  }
};

export const adminOnly = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    next(ApiError.forbidden("Admin access required"));
  }
};
