import statusCode from "http-status";

/**
 * @private
 * extending default javascript error class
 */
export class _CustomError extends Error {
  constructor(message, error, status) {
    super();

    Error.captureStackTrace(this, this.constructor);

    this.name = this.constructor.name;
    this.error = error || "internal server error";
    this.message = message || "Something went wrong. Please try again.";

    this.status = status || statusCode.INTERNAL_SERVER_ERROR;
  }
}

/**
 * for query or body validation errors.
 * @public
 * @access public
 */
export class ValidationError extends _CustomError {
  constructor(message, error) {
    super(
      message || "validation failed",
      error || "bad request",
      statusCode.BAD_REQUEST
    );
  }
}

/**
 * @public
 * for resource not found errors
 */
export class NotFoundError extends _CustomError {
  constructor(message, error) {
    super(
      message || "record not found",
      error || "not found",
      statusCode.NOT_FOUND
    );
  }
}

/**
 * @public
 * for Application errors
 */
export class ApplicationError extends _CustomError {
  constructor(message, error) {
    super(
      message || "something has gone wrong",
      error || "internal server error",
      statusCode.INTERNAL_SERVER_ERROR
    );
  }
}
