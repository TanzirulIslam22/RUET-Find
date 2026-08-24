import asyncHandler from "../../utils/asyncHandler.js";
import ApiResponse from "../../utils/ApiResponse.js";
import { cookieOptions, clearCookieOptions } from "../../config/env.js";
import * as authService from "./auth.service.js";

export const register = asyncHandler(async (req, res) => {
  const result = await authService.registerUser(req.body);
  res.cookie("accessToken", result.token, cookieOptions);
  res.status(201).json(ApiResponse.created(result, "Registration successful"));
});

export const login = asyncHandler(async (req, res) => {
  const result = await authService.loginUser(req.body);
  res.cookie("accessToken", result.token, cookieOptions);
  res.json(ApiResponse.ok(result, "Login successful"));
});

export const getMe = asyncHandler(async (req, res) => {
  const user = await authService.getMe(req.user._id);
  res.json(ApiResponse.ok(user));
});

export const logout = asyncHandler(async (req, res) => {
  res.clearCookie("accessToken", clearCookieOptions);
  res.json(ApiResponse.ok(null, "Logged out successfully"));
});
