import Joi from "joi";
// import status from "http-status";
import { ValidationError } from "../../../helpers/error-classes";
/**
 *
 * @param {object} body
 */
const _validationSchema = body => {
  const schema = {
    comment: Joi.string()
      .max(500)
      .required(),
    mid: Joi.number()
      .integer()
      .min(1)
      .max(7)
      .required()
  };
  return Joi.validate(body, schema);
};

export const validateCreateComment = (req, res, next) => {
  const { error } = _validationSchema(req.body);
  if (error) {
    return next(new ValidationError(error.details[0].message));
  } else {
    return next();
  }
};
