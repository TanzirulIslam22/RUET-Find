import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";
import { fileURLToPath } from "url";
import { env } from "./config/env.js";
import errorHandler from "./middlewares/error.middleware.js";
import authRoutes from "./modules/auth/auth.routes.js";
import itemRoutes from "./modules/items/item.routes.js";
import adminRoutes from "./modules/admin/admin.routes.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// allow the production domain, local dev, and any vercel deployment of this
// project (preview urls like ruet-find-abc123-tanzirstudio.vercel.app included)
const allowedOrigins = [
  env.CLIENT_URL,
  "http://localhost:5173",
  "http://127.0.0.1:5173",
];

const isProjectOrigin = (origin) => {
  try {
    const { hostname, protocol } = new URL(origin);
    if (protocol !== "https:" && hostname !== "localhost" && hostname !== "127.0.0.1") {
      return false;
    }
    return (
      hostname === "ruet-find.vercel.app" ||
      hostname.startsWith("ruet-find-") ||
      hostname.endsWith("-tanzirstudio.vercel.app")
    );
  } catch {
    return false;
  }
};

app.use(
  cors({
    origin(origin, callback) {
      // no origin header = same-origin request or tooling like curl/postman
      if (!origin || allowedOrigins.includes(origin) || isProjectOrigin(origin)) {
        callback(null, true);
      } else {
        callback(null, false);
      }
    },
    credentials: true,
  })
);
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

app.use("/api/auth", authRoutes);
app.use("/api/items", itemRoutes);
app.use("/api/admin", adminRoutes);

app.get("/api/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

app.use(errorHandler);

export default app;
