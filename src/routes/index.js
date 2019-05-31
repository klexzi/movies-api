import express from "express";
import movieRoutes from "./movies-routes";
import { NotFoundError } from "../helpers/error-classes";
import clearCacheRoutes from "./clear-cache-routes";

const apiRoutes = express.Router();

apiRoutes.use("/movies", movieRoutes);
apiRoutes.use("/cache", clearCacheRoutes);

//invalid endpoint request
apiRoutes.use((req, res, next) => {
  return next(new NotFoundError("endpoint not found"));
});

export default apiRoutes;
