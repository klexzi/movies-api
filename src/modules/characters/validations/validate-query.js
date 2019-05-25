import Joi from "joi";
import { ValidationError } from "../../../helpers/error-classes";

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
    return next(new ValidationError(error.details[0].message));
  } else {
    return next();
  }
};
