import Item from "./item.model.js";
import ApiError from "../../utils/ApiError.js";

export const createItem = async (itemData, userId) => {
  const item = await Item.create({
    ...itemData,
    reportedBy: userId,
  });
  return item.populate("reportedBy", "name email studentId");
};

export const getItemById = async (itemId) => {
  const item = await Item.findById(itemId)
    .populate("reportedBy", "name email studentId department")
    .populate("claimedBy", "name email");
  if (!item) {
    throw ApiError.notFound("Item not found");
  }
  return item;
};

export const getAllItems = async (filters = {}) => {
  const {
    status,
    category,
    location,
    search,
    page = 1,
    limit = 12,
    sort = "newest",
    dateRange,
  } = filters;

  const query = { itemStatus: "active" };

  if (status) query.status = status;
  if (category) query.category = category;
  if (location) query.location = { $regex: location, $options: "i" };
  if (search) {
    query.$or = [
      { title: { $regex: search, $options: "i" } },
      { description: { $regex: search, $options: "i" } },
    ];
  }

  if (dateRange) {
    const now = new Date();
    if (dateRange === "today") {
      const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      query.createdAt = { $gte: startOfDay };
    } else if (dateRange === "week") {
      const startOfWeek = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
      query.createdAt = { $gte: startOfWeek };
    } else if (dateRange === "month") {
      const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
      query.createdAt = { $gte: startOfMonth };
    }
  }

  const skip = (parseInt(page) - 1) * parseInt(limit);
  const sortOption = sort === "oldest" ? { createdAt: 1 } : { createdAt: -1 };

  const [items, total] = await Promise.all([
    Item.find(query)
      .populate("reportedBy", "name email studentId")
      .sort(sortOption)
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
      limit: parseInt(limit),
    },
  };
};

export const updateItem = async (itemId, updateData, userId) => {
  const item = await Item.findById(itemId);
  if (!item) {
    throw ApiError.notFound("Item not found");
  }
  if (item.reportedBy.toString() !== userId.toString()) {
    throw ApiError.forbidden("Not authorized to update this item");
  }
  Object.assign(item, updateData);
  await item.save();
  return item.populate("reportedBy", "name email studentId");
};

export const deleteItem = async (itemId, userId) => {
  const item = await Item.findById(itemId);
  if (!item) {
    throw ApiError.notFound("Item not found");
  }
  if (item.reportedBy.toString() !== userId.toString()) {
    throw ApiError.forbidden("Not authorized to delete this item");
  }
  await Item.findByIdAndDelete(itemId);
};

export const getRecentItems = async (limit = 6) => {
  return Item.find({ itemStatus: "active" })
    .populate("reportedBy", "name email studentId")
    .sort({ createdAt: -1 })
    .limit(limit);
};

export const getItemsByCategory = async () => {
  return Item.aggregate([
    { $match: { itemStatus: "active" } },
    { $group: { _id: "$category", count: { $sum: 1 } } },
    { $sort: { count: -1 } },
  ]);
};

export const claimItem = async (itemId, userId) => {
  const item = await Item.findById(itemId);
  if (!item) {
    throw ApiError.notFound("Item not found");
  }
  if (item.reportedBy.toString() === userId.toString()) {
    throw ApiError.badRequest("Cannot claim your own item");
  }
  item.claimedBy = userId;
  item.itemStatus = "claimed";
  await item.save();
  return item;
};

export const getSmartMatches = async (itemId) => {
  const item = await Item.findById(itemId);
  if (!item) {
    throw ApiError.notFound("Item not found");
  }

  const oppositeStatus = item.status === "lost" ? "found" : "lost";

  const candidates = await Item.find({
    status: oppositeStatus,
    itemStatus: "active",
    category: item.category,
  }).populate("reportedBy", "name email studentId");

  const matches = candidates.map((candidate) => {
    let score = 0;
    const reasons = [];

    if (candidate.category === item.category) {
      score += 40;
      reasons.push({ text: "Same category", type: "success" });
    }
    if (
      candidate.color &&
      item.color &&
      candidate.color.toLowerCase() === item.color.toLowerCase()
    ) {
      score += 25;
      reasons.push({ text: "Similar color", type: "success" });
    }
    if (
      candidate.brand &&
      item.brand &&
      candidate.brand.toLowerCase() === item.brand.toLowerCase()
    ) {
      score += 20;
      reasons.push({ text: "Same brand", type: "success" });
    }
    if (
      candidate.location.toLowerCase().includes(item.location.toLowerCase().split(",")[0])
    ) {
      score += 15;
      reasons.push({ text: "Nearby location", type: "success" });
    }

    return {
      item: candidate,
      score: Math.min(score, 99),
      reasons,
    };
  });

  return matches
    .filter((m) => m.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 5);
};
