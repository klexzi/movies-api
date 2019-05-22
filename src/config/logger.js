import {createLogger, format, transports} from "winston";

const {timestamp, combine, prettyPrint, label, colorize} = format;

const logger = createLogger({
   transports: [
      new transports.Console({
         level: process.env.NODE_ENV === "production" ? "error" : "debug"
      }),
      new transports.File({filename: "errors.log", level: "error" })
   ],
   exceptionHandlers: [
      new transports.File({filename: "exceptions.log"})
   ],
   format: combine(
      label({label: "Log"}),
      timestamp(),
      prettyPrint(),
      colorize()
   )
})

logger.exitOnError = false;

export {logger as default};