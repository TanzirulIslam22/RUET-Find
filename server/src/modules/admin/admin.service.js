import Item from "../items/item.model.js";
import User from "../auth/auth.model.js";
import ApiError from "../../utils/ApiError.js";

export const getDashboardStats = async () => {
  const [totalUsers, activeLost, foundHeld, recovered, recentItems, categoryStats] =
    await Promise.all([
      User.countDocuments({ role: "student" }),
      Item.countDocuments({ status: "lost", itemStatus: "active" }),
      Item.countDocuments({ status: "found", itemStatus: "active" }),
      Item.countDocuments({ itemStatus: { $in: ["claimed", "returned"] } }),
      Item.find()
        .populate("reportedBy", "name email")
        .sort({ createdAt: -1 })
        .limit(10),
      Item.aggregate([
        { $group: { _id: "$category", lost: { $sum: { $cond: [{ $eq: ["$status", "lost"] }, 1, 0] } }, found: { $sum: { $cond: [{ $eq: ["$status", "found"] }, 1, 0] } } } },
        { $sort: { _id: 1 } },
      ]),
    ]);

  const weeklyStats = await Item.aggregate([
    {
      $group: {
        _id: {
          $dateToString: { format: "%Y-%m-%d", date: "$createdAt" },
        },
        lost: { $sum: { $cond: [{ $eq: ["$status", "lost"] }, 1, 0] } },
        found: { $sum: { $cond: [{ $eq: ["$status", "found"] }, 1, 0] } },
      },
    },
    { $sort: { _id: -1 } },
    { $limit: 7 },
  ]);

  return {
    totalUsers,
    activeLost,
    foundHeld,
    recovered,
    recoveryRate: totalUsers > 0 ? Math.round((recovered / (activeLost + foundHeld + recovered)) * 100) : 0,
    recentItems,
    categoryStats,
    weeklyStats: weeklyStats.reverse(),
  };
};

export const getAllItemsAdmin = async (filters = {}) => {
  const { page = 1, limit = 20, status, itemStatus, search } = filters;
  const query = {};

  if (status) query.status = status;
  if (itemStatus) query.itemStatus = itemStatus;
  if (search) {
    query.$or = [
      { title: { $regex: search, $options: "i" } },
    ];
  }

  const skip = (parseInt(page) - 1) * parseInt(limit);
  const [items, total] = await Promise.all([
    Item.find(query)
      .populate("reportedBy", "name email studentId")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit)),
    Item.countDocuments(query),
  ]);

  return {
    items,
    pagination: {
      total,
      page: parseInt(page),
      pages: Math.ceil(total / parseInt(limit)),
    },
  };
};

export const updateItemStatus = async (itemId, itemStatus) => {
  const item = await Item.findByIdAndUpdate(
    itemId,
    { itemStatus },
    { new: true }
  ).populate("reportedBy", "name email studentId");
  if (!item) throw ApiError.notFound("Item not found");
  return item;
};

export const deleteItemAdmin = async (itemId) => {
  const item = await Item.findByIdAndDelete(itemId);
  if (!item) throw ApiError.notFound("Item not found");
};

export const getAllUsers = async (page = 1, limit = 20) => {
  const skip = (page - 1) * limit;
  const [users, total] = await Promise.all([
    User.find().sort({ createdAt: -1 }).skip(skip).limit(limit),
    User.countDocuments(),
  ]);
  return {
    users,
    pagination: { total, page, pages: Math.ceil(total / limit) },
  };
};
