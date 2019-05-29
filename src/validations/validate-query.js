import Joi from "@hapi/joi";
import { ValidationError } from "../helpers/error-classes";

/**
 *
 * @param {object} queryParams request query parameter body
 * @access private
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

/**
 *
 * @param {*} req request
 * @param {*} res response
 * @param {function} next express handler
 * @access public
 */
export const validateQuery = (req, res, next) => {
  const { error } = _validationSchema(req.query);
  if (error) {
    return next(new ValidationError(error.details[0].message));
  } else {
    return next();
  }
};
