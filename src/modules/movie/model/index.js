import { fetch } from "../../../config/axios";
import logger from "../../../config/logger";
import { transformMovieData } from "../../../helpers/transform-movies";
import cache from "../../../config/cache";

export class Movie {
  constructor(id) {
    this.id = id;
  }
  async list() {
    const key = "/movies";
    return cache.get(key, async () => {
      let movieRecords;
      try {
        movieRecords = await fetch.get("films");
      } catch (error) {
        logger.error(error);
        return { results: [] };
      }

      movieRecords = movieRecords.data;
      movieRecords = await transformMovieData(movieRecords);
      logger.debug("movie records:", movieRecords);
      console.log(movieRecords);
      return movieRecords;
    });
  }

  async findById(id) {
    const key = `findMovieById(${id})`;

    return cache.get(key, async () => {
      let movieRecord;
      try {
        movieRecord = await fetch.get(`films/${id}`);
      } catch (error) {
        logger.error(error);
        return null;
      }

      movieRecord = movieRecord.data;
      movieRecord = transformMovieData(movieRecord);
      return movieRecord;
    });
  }
}
