import asyncHandler from "../../utils/asyncHandler.js";
import ApiResponse from "../../utils/ApiResponse.js";
import * as itemService from "./item.service.js";

export const createItem = asyncHandler(async (req, res) => {
  const images = req.files
    ? req.files.map((file) => `/uploads/${file.filename}`)
    : [];
  const item = await itemService.createItem(
    { ...req.body, images },
    req.user._id
  );
  res.status(201).json(ApiResponse.created(item, "Item reported successfully"));
});

export const getItem = asyncHandler(async (req, res) => {
  const item = await itemService.getItemById(req.params.id);
  res.json(ApiResponse.ok(item));
});

export const getAllItems = asyncHandler(async (req, res) => {
  const result = await itemService.getAllItems(req.query);
  res.json(ApiResponse.ok(result));
});

export const updateItem = asyncHandler(async (req, res) => {
  const item = await itemService.updateItem(req.params.id, req.body, req.user._id);
  res.json(ApiResponse.ok(item, "Item updated successfully"));
});

export const deleteItem = asyncHandler(async (req, res) => {
  await itemService.deleteItem(req.params.id, req.user._id);
  res.json(ApiResponse.ok(null, "Item deleted successfully"));
});

export const getRecentItems = asyncHandler(async (req, res) => {
  const items = await itemService.getRecentItems(6);
  res.json(ApiResponse.ok(items));
});

export const getItemsByCategory = asyncHandler(async (req, res) => {
  const categories = await itemService.getItemsByCategory();
  res.json(ApiResponse.ok(categories));
});

export const claimItem = asyncHandler(async (req, res) => {
  const item = await itemService.claimItem(req.params.id, req.user._id);
  res.json(ApiResponse.ok(item, "Item claimed successfully"));
});

export const getSmartMatches = asyncHandler(async (req, res) => {
  const matches = await itemService.getSmartMatches(req.params.id);
  res.json(ApiResponse.ok(matches));
});
