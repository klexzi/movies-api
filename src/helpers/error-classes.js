import statusCode from "http-status";

export class CustomError extends Error {
  constructor(error, message, status) {
    super();

    Error.captureStackTrace(this, this.constructor);

    this.name = this.constructor.name;
    this.error = error || "internal server error";
    this.message = message || "Something went wrong. Please try again.";

    this.status = status || statusCode.INTERNAL_SERVER_ERROR;
  }
}

export class ValidationError extends CustomError {
  constructor(error, message) {
    console.log("hon", error);
    super(
      error || "bad request",
      message || "validation failed",
      statusCode.BAD_REQUEST
    );
  }
}

export class NotFoundError extends CustomError {
  constructor(error, message) {
    super(
      error || "not found",
      message || "record not found",
      statusCode.NOT_FOUND
    );
  }
}
