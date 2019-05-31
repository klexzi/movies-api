import express from "express";
import { clearCache } from "../controllers";
import { NotFoundError } from "../helpers/error-classes";

const clearCacheRoutes = express.Router();
clearCacheRoutes.get("/clear", clearCache);
export default clearCacheRoutes;
clearCacheRoutes.use((req, res, next) => {
  return next(new NotFoundError("endpoint not found"));
});
