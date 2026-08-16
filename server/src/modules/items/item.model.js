import mongoose from "mongoose";

const itemSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Item title is required"],
      trim: true,
      maxlength: 200,
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      maxlength: 2000,
    },
    category: {
      type: String,
      required: [true, "Category is required"],
      enum: ["electronics", "documents", "keys", "clothing", "bags", "books", "other"],
    },
    status: {
      type: String,
      enum: ["lost", "found"],
      required: [true, "Status is required"],
    },
    itemStatus: {
      type: String,
      enum: ["pending", "active", "claimed", "returned", "expired"],
      default: "active",
    },
    location: {
      type: String,
      required: [true, "Location is required"],
      trim: true,
    },
    dateLostFound: {
      type: Date,
      default: Date.now,
    },
    images: [
      {
        type: String,
      },
    ],
    color: {
      type: String,
      trim: true,
    },
    brand: {
      type: String,
      trim: true,
    },
    additionalDetails: {
      type: String,
      maxlength: 1000,
    },
    contactInfo: {
      type: String,
      trim: true,
    },
    reportedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    claimedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    locationCoordinates: {
      lat: Number,
      lng: Number,
    },
  },
  { timestamps: true }
);

itemSchema.index({ status: 1, itemStatus: 1 });
itemSchema.index({ category: 1 });
itemSchema.index({ location: 1 });
itemSchema.index({ createdAt: -1 });
itemSchema.index({ title: "text", description: "text" });

export default mongoose.model("Item", itemSchema);
