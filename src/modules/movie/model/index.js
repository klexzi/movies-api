import { fetch } from "../../../config/axios";
import logger from "../../../config/logger";
import { transformMovieData } from "../../../helpers/transform-movies";
import Cache from "../../../config/cache";

const ttl = 60 * 60 * 1; // cache for 1 Hour
const cache = new Cache(ttl); // Create a new cache service instance
export class Movie {
  constructor(id) {
    this.id = id;
  }

  async list() {
    const key = "listMovies";
    return cache.get(key, async () => {
      let movieRecords;
      try {
        movieRecords = await fetch.get("films");
      } catch (error) {
        logger.error(error);
        return { results: [] };
      }

      movieRecords = movieRecords.data;
      movieRecords = transformMovieData(movieRecords);
      logger.debug("movie records:", movieRecords);
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
