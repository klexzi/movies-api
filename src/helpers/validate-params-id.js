import Joi from "joi";
import status from "http-status";

/**
 *
 * @param {object} params
 */
const _validationSchema = params => {
  const schema = {
    id: Joi.number()
      .integer()
      .required()
  };

  return Joi.validate(params, schema);
};

export const validateParamsId = (req, res, next) => {
  const { error } = _validationSchema(req.params);
  if (error) {
    return res.status(400).json({
      error: "bad request",
      message: error.details[0].message,
      status: status.BAD_REQUEST
    });
  } else {
    return next();
  }
};
