import User from "./auth.model.js";
import ApiError from "../../utils/ApiError.js";
import jwt from "jsonwebtoken";
import { env } from "../../config/env.js";

const generateToken = (userId) => {
  return jwt.sign({ id: userId }, env.JWT_SECRET, {
    expiresIn: env.JWT_EXPIRES_IN,
  });
};

export const registerUser = async ({ name, email, password, studentId, department, phone }) => {
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw ApiError.conflict("Email already registered");
  }

  if (studentId) {
    const existingStudent = await User.findOne({ studentId });
    if (existingStudent) {
      throw ApiError.conflict("Student ID already registered");
    }
  }

  const user = await User.create({
    name,
    email,
    password,
    studentId,
    department,
    phone,
  });

  const token = generateToken(user._id);

  return {
    user: {
      _id: user._id,
      name: user.name,
      email: user.email,
      studentId: user.studentId,
      department: user.department,
      role: user.role,
    },
    token,
  };
};

export const loginUser = async ({ email, password }) => {
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    throw ApiError.unauthorized("Invalid email or password");
  }

  const isPasswordMatch = await user.comparePassword(password);
  if (!isPasswordMatch) {
    throw ApiError.unauthorized("Invalid email or password");
  }

  const token = generateToken(user._id);

  return {
    user: {
      _id: user._id,
      name: user.name,
      email: user.email,
      studentId: user.studentId,
      department: user.department,
      role: user.role,
    },
    token,
  };
};

export const getMe = async (userId) => {
  const user = await User.findById(userId);
  if (!user) {
    throw ApiError.notFound("User not found");
  }
  return user;
};
