import express from "express";
import status from "http-status";
import movieRoutes from "../modules/movie/route";
import charactersRoutes from "../modules/characters/route";
import commentRoutes from "../modules/comments/route";

const apiRoutes = express.Router();

apiRoutes.use("/movies", movieRoutes);
apiRoutes.use("/characters", charactersRoutes);
apiRoutes.use("/comments", commentRoutes);

//invalid endpoint request
apiRoutes.use((req, res) => {
  return res.status(404).json({
    error: "endpoint not found",
    message: "endpoint not found",
    status: status.NOT_FOUND
  });
});

export default apiRoutes;
