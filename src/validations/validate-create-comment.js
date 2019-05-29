import Joi from "@hapi/joi";
// import status from "http-status";
import { ValidationError } from "../helpers/error-classes";
/**
 * Validates request body for creating comment endpoint.
 * @param {object} body request body object to validate
 */
const _validationSchema = body => {
  const schema = {
    comment: Joi.string()
      .max(500)
      .required()
  };
  return Joi.validate(body, schema);
};

/**
 * Validation middleware for creating comment endpoint.
 * it validates and returns error if any, else passes to the next handler.
 */
export const validateCreateComment = (req, res, next) => {
  const { error } = _validationSchema(req.body);
  if (error) {
    return next(new ValidationError(error.details[0].message));
  } else {
    return next();
  }
};
