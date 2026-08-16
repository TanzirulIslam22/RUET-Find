import ApiError from "./ApiError.js";

export const validate = (schema) => (req, res, next) => {
  try {
    schema.parse(req.body);
    next();
  } catch (error) {
    const errors = error.errors?.map((e) => ({
      field: e.path.join("."),
      message: e.message,
    })) || [{ message: error.message }];
    next(ApiError.badRequest("Validation failed", errors));
  }
};
