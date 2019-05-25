import Comment from "../modules/comments/model/";
/**
 *
 * @param {number} movieId
 * @private
 */
const _countComments = async movieId => {
  let commentCount = await Comment.count({ where: { mid: movieId } });
  return commentCount;
};
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
    let id = 1;
    const promises = movies.map(async movie => {
      let { title, opening_crawl, release_date } = movie;
      const commentsCount = await _countComments(id++);
      return {
        title,
        opening_crawl,
        release_date,
        id: id++,
        commentsCount
      };
    });
    // eslint-disable-next-line no-undef
    return Promise.all(promises);
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
export const transformMovieData = async movies => {
  let moviesResult = movies;
  if (Array.isArray(movies.results)) {
    moviesResult = _sortByReleaseDate(movies);
  }

  moviesResult = await _pickFields(moviesResult);
  moviesResult = _formatResult(moviesResult);
  return moviesResult;
};
