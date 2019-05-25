import Joi from "joi";
import status from "http-status";

/**
 *
 * @param {object} queryParams
 */
const _validationSchema = queryParams => {
  const schema = {
    sortBy: Joi.string().valid(["name", "gender", "height"]),
    order: Joi.string()
      .valid(["asc", "desc"])
      .when("sortBy", {
        is: Joi.exist(),
        then: Joi.required(),
        otherwise: Joi.forbidden()
      }),
    gender: Joi.string().valid(["male", "female", "n/a"])
  };

  return Joi.validate(queryParams, schema);
};

export const validateQuery = (req, res, next) => {
  const { error } = _validationSchema(req.query);
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
