import { Router } from "express";
import * as authController from "./auth.controller.js";
import { protect } from "../../middlewares/auth.middleware.js";
import { validate } from "../../utils/validate.js";
import { registerSchema, loginSchema } from "./auth.validation.js";

const router = Router();

router.post("/register", validate(registerSchema), authController.register);
router.post("/login", validate(loginSchema), authController.login);
router.get("/me", protect, authController.getMe);
router.post("/logout", protect, authController.logout);

export default router;
