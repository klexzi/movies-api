import express from "express";
import movieRoutes from "./movies-routes";
import { NotFoundError } from "../helpers/error-classes";

const apiRoutes = express.Router();

apiRoutes.use("/movies", movieRoutes);

//invalid endpoint request
apiRoutes.use((req, res, next) => {
  return next(new NotFoundError("endpoint not found"));
});

export default apiRoutes;
