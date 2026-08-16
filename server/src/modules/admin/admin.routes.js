import { Router } from "express";
import * as adminController from "./admin.controller.js";
import { protect, adminOnly } from "../../middlewares/auth.middleware.js";

const router = Router();

router.use(protect, adminOnly);

router.get("/dashboard", adminController.getDashboard);
router.get("/items", adminController.getAllItems);
router.put("/items/:id/status", adminController.updateItemStatus);
router.delete("/items/:id", adminController.deleteItem);
router.get("/users", adminController.getAllUsers);

export default router;
