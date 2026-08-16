import { z } from "zod";

export const createItemSchema = z.object({
  title: z.string().min(2).max(200),
  description: z.string().min(10).max(2000),
  category: z.enum(["electronics", "documents", "keys", "clothing", "bags", "books", "other"]),
  status: z.enum(["lost", "found"]),
  location: z.string().min(1).max(200),
  dateLostFound: z.string().optional(),
  color: z.string().optional(),
  brand: z.string().optional(),
  additionalDetails: z.string().max(1000).optional(),
  contactInfo: z.string().optional(),
});

export const updateItemSchema = z.object({
  title: z.string().min(2).max(200).optional(),
  description: z.string().min(10).max(2000).optional(),
  category: z.enum(["electronics", "documents", "keys", "clothing", "bags", "books", "other"]).optional(),
  location: z.string().min(1).max(200).optional(),
  color: z.string().optional(),
  brand: z.string().optional(),
  additionalDetails: z.string().max(1000).optional(),
  contactInfo: z.string().optional(),
  itemStatus: z.enum(["pending", "active", "claimed", "returned", "expired"]).optional(),
});

export const querySchema = z.object({
  status: z.enum(["lost", "found"]).optional(),
  category: z.enum(["electronics", "documents", "keys", "clothing", "bags", "books", "other"]).optional(),
  location: z.string().optional(),
  search: z.string().optional(),
  page: z.string().optional(),
  limit: z.string().optional(),
  sort: z.enum(["newest", "oldest"]).optional(),
  dateRange: z.enum(["today", "week", "month"]).optional(),
});
