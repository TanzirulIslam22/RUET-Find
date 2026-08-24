import dotenv from "dotenv";
dotenv.config();

// if the client is served over https (vercel) we need secure + sameSite none
// for the auth cookie to survive the cross-site request; on localhost lax works
const isHttpsClient = (process.env.CLIENT_URL || "").startsWith("https");

export const env = {
  PORT: process.env.PORT || 5000,
  MONGODB_URI: process.env.MONGODB_URI || "mongodb://localhost:27017/ruetfind",
  JWT_SECRET: process.env.JWT_SECRET || "default-secret-change-me",
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || "7d",
  CLIENT_URL: process.env.CLIENT_URL || "http://localhost:5173",
};

const sevenDays = 7 * 24 * 60 * 60 * 1000;

export const cookieOptions = {
  httpOnly: true,
  secure: isHttpsClient,
  sameSite: isHttpsClient ? "none" : "lax",
  maxAge: sevenDays,
};

// clearCookie needs matching attributes to expire the right cookie
export const clearCookieOptions = {
  httpOnly: true,
  secure: isHttpsClient,
  sameSite: isHttpsClient ? "none" : "lax",
};
