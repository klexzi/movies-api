import Joi from "@hapi/joi";
import status from "http-status";

/**
 *
 * @param {object} params
 * @access public
 */
const _validationSchema = params => {
  const schema = {
    movieId: Joi.number()
      .integer()
      .required()
  };

  return Joi.validate(params, schema);
};
/**
 *
 * @param {*} req request
 * @param {*} res response
 * @param {function} next express handler
 * @access public
 */
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
