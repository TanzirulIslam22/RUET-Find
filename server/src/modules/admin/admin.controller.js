import asyncHandler from "../../utils/asyncHandler.js";
import ApiResponse from "../../utils/ApiResponse.js";
import * as adminService from "./admin.service.js";

export const getDashboard = asyncHandler(async (req, res) => {
  const stats = await adminService.getDashboardStats();
  res.json(ApiResponse.ok(stats));
});

export const getAllItems = asyncHandler(async (req, res) => {
  const result = await adminService.getAllItemsAdmin(req.query);
  res.json(ApiResponse.ok(result));
});

export const updateItemStatus = asyncHandler(async (req, res) => {
  const item = await adminService.updateItemStatus(req.params.id, req.body.itemStatus);
  res.json(ApiResponse.ok(item, "Item status updated"));
});

export const deleteItem = asyncHandler(async (req, res) => {
  await adminService.deleteItemAdmin(req.params.id);
  res.json(ApiResponse.ok(null, "Item deleted"));
});

export const getAllUsers = asyncHandler(async (req, res) => {
  const { page = 1, limit = 20 } = req.query;
  const result = await adminService.getAllUsers(parseInt(page), parseInt(limit));
  res.json(ApiResponse.ok(result));
});
