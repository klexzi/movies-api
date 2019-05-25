import express from "express";
import movieRoutes from "../modules/movie/route";
import charactersRoutes from "../modules/characters/route";
import commentRoutes from "../modules/comments/route";
import { NotFoundError } from "../helpers/error-classes";

const apiRoutes = express.Router();

apiRoutes.use("/movies", movieRoutes);
apiRoutes.use("/characters", charactersRoutes);
apiRoutes.use("/comments", commentRoutes);

//invalid endpoint request
apiRoutes.use((req, res, next) => {
  return next(new NotFoundError("endpoint not found"));
});

export default apiRoutes;
