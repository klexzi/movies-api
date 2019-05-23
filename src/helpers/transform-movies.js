/**
 *
 * @param {number} movieId
 * @private
 */
const _countComments = movieId => {};

/**
 *
 * @param {array} movies
 * @private
 */
const _sortByReleaseDate = movies => {
  return movies.results.sort(
    (a, b) => new Date(a.release_date) - new Date(b.release_date)
  );
};

/**
 *
 * @param {array || object} movies
 * @private
 */
const _pickFields = movies => {
  if (Array.isArray(movies)) {
    return movies.map(movie => {
      let { title, opening_crawl, release_date } = movie;
      return { title, opening_crawl, release_date };
    });
  } else {
    let { title, opening_crawl, release_date } = movies;
    return { title, opening_crawl, release_date };
  }
};

/**
 *
 * @param {array || object} movies
 * @private
 */
const _formatResult = movies => {
  if (Array.isArray(movies)) {
    return { results: movies, total: movies.length };
  }
  return movies;
};

/**
 *
 * @param {array} movies
 * @public
 */
export const transformMovieData = movies => {
  let moviesResult = movies;
  if (Array.isArray(movies.results)) {
    moviesResult = _sortByReleaseDate(movies);
  }

  moviesResult = _pickFields(moviesResult);
  moviesResult = _formatResult(moviesResult);
  return moviesResult;
};
