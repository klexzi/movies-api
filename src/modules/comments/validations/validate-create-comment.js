import Joi from "joi";
import status from "http-status";
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
    return res
      .status(400)
      .json({
        error: "bad request",
        message: error.details[0].message,
        status: status.BAD_REQUEST
      });
  } else {
    return next();
  }
};
