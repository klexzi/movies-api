import express from "express";
import movieRoutes from "../modules/movie/route";

const apiRoutes = express.Router();

apiRoutes.use("/movies", movieRoutes);

//invalid endpoint request
apiRoutes.use((req, res) => {
  return res.status(404).json({
    error: "no endpoint specified for this request",
    message: "endpoint not found",
    statusCode: 404
  });
});

export default apiRoutes;
