import { Comment } from "../models";
import { fetch } from "../config/axios";
import logger from "../config/logger";
import { FetchError, ApplicationError, NotFoundError } from "./error-classes";
/**
 *
 * @param {number} movieId identifier of the movie.
 * @access private
 * @private
 */
const _countComments = async movieId => {
  let commentCount = await Comment.count({ where: { mid: movieId } });
  return commentCount;
};
/**
 *
 * @param {array} movies array of movies data.
 * @access private
 * @private
 */
const _sortByReleaseDate = movies => {
  return movies.results.sort(
    (a, b) => new Date(a.release_date) - new Date(b.release_date)
  );
};

/**
 *
 * @param {array} movies array of movies data.
 * @access private
 * @private
 */
const _pickFields = movies => {
  const promises = movies.map(async (movie, i) => {
    // to form the data id
    let id = i + 1;
    let { title, opening_crawl, release_date } = movie;
    const commentsCount = await _countComments(id);
    const movieObject = {
      title,
      opening_crawl,
      release_date,
      id,
      commentsCount
    };
    return movieObject;
  });
  // eslint-disable-next-line no-undef
  return Promise.all(promises);
};

/**
 *
 * @param {array} movies array of movies data.
 * @access private
 * @private
 */
const _formatResult = movies => {
  return { results: movies, total: movies.length };
};

/**
 * Performs all necessary transformation for movies data.
 * Transformations like sorting by release date, selecting neccessary fields,
 * and then formatting the data to the necessary format.
 * @param {array} movies array of movies data.
 * @access private
 * @public
 */
const _transformMovieData = async movies => {
  let moviesResult = movies;
  moviesResult = _sortByReleaseDate(movies);

  moviesResult = await _pickFields(moviesResult);
  moviesResult = _formatResult(moviesResult);
  return moviesResult;
};

/**
 * This checks the cause of the error encountered while trying to fetch movies,
 * and initiates the appropriate error handlers.
 * @param {object} error error object gotten
 * @access public
 * @returns void
 */
export const checkFetchMovieError = error => {
  let isNotFoundError = error.response && error.response.status === 404;
  // if error was caused by making a request to get movies and movies not found.
  if (isNotFoundError) {
    throw new NotFoundError("movie(s) not found");
  }
  // if swapi throws error for any other reason except from 404 error
  else if (error.request || error.code === "ENOTFOUND") {
    throw new FetchError(error.data.details);
  }
};
/**
 * Lists all the movies from swapi.
 * It lists all star wars films from swapi.co and performs all transformations.
 * @access public
 */
export const getMovies = async () => {
  try {
    let movies = await fetch.get("films");
    return await _transformMovieData(movies.data);
  } catch (error) {
    logger.error(error);
    // check if error is caused by making request
    checkFetchMovieError(error);
    // else error was caused by the application.
    throw new ApplicationError(error.message);
  }
};

/**
 * it gets a movie selected by the movie id passed.
 * it gets a movie by movie id, and returns null if no movie was
 * found, it can also be used to validate if a movie exist in swapi.co.
 * @param {number} movieId
 * @access public
 */
export const getMovie = async movieId => {
  try {
    let movie = await fetch.get(`films/${movieId}`);
    return movie.data;
  } catch (error) {
    // check if error is caused by making request
    checkFetchMovieError(error);
    // else error was caused by the application.
    throw new ApplicationError(error.message);
  }
};
