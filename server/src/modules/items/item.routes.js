import { Router } from "express";
import * as itemController from "./item.controller.js";
import { protect } from "../../middlewares/auth.middleware.js";
import { upload } from "../../middlewares/upload.middleware.js";
import { validate } from "../../utils/validate.js";
import { createItemSchema } from "./item.validation.js";

const router = Router();

router.get("/recent", itemController.getRecentItems);
router.get("/categories", itemController.getItemsByCategory);
router.get("/", itemController.getAllItems);
router.get("/:id", itemController.getItem);
router.get("/:id/matches", itemController.getSmartMatches);

router.post(
  "/",
  protect,
  upload.array("images", 5),
  validate(createItemSchema),
  itemController.createItem
);
router.put("/:id", protect, itemController.updateItem);
router.delete("/:id", protect, itemController.deleteItem);
router.post("/:id/claim", protect, itemController.claimItem);

export default router;
