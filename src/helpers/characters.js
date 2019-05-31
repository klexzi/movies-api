import axios from "axios";

import { fetch } from "../config/axios";
import logger from "../config/logger";
import { filter, sort, toFeetAndInches } from "./utils";
import { NotFoundError, ApplicationError, FetchError } from "./error-classes";

/**
 *
 * @param {string} link the url to get the character resource.
 */
const _getCharacter = async link => {
  const character = await axios.get(link);
  return character.data;
};

/**
 *
 * @param {array} characterLinks an array of url links to get the characters.
 * @private
 */
const _fetchCharacters = characterLinks => {
  const promises = characterLinks.map(async characterLink => {
    let character = await _getCharacter(characterLink);
    return character;
  });

  // eslint-disable-next-line no-undef
  return Promise.all(promises);
};

/**
 * returns the characters meta.
 * it computes the total height of the characters results in
 * centimeters and feet.
 * @param {array} characters an array of characters of a movie.
 * @access public
 */
export const _getCharacterMeta = characters => {
  const totalHeightInCm = characters.reduce(
    (total, character) => total + +character.height,
    0
  );
  const totalHeightInFeet = toFeetAndInches(+totalHeightInCm);
  const totalCharacters = characters.length;
  return { totalHeightInCm, totalHeightInFeet, totalCharacters };
};

/**
 * Gets the characters of a movie specified by the movie id.
 * @param {number} movieId the identifier of the movie.
 * @param {object} options this is an object containing options for filter and sorting.
 * @public
 */
export const getCharacters = async (movieId, options = {}) => {
  try {
    const { filterBy, filterValue, sortBy, order } = options;
    let movie = await fetch.get(`films/${movieId}`);
    let charactersLinks = movie.data.characters;
    let characters = await _fetchCharacters(charactersLinks);
    if (filterBy && filterValue) {
      characters = filter(characters, filterBy, filterValue);
    }
    if (sortBy) {
      characters = sort(characters, sortBy, order);
    }
    return { characters, meta: _getCharacterMeta(characters) };
  } catch (error) {
    console.log(error);
    let isNotFoundError =
      error.response && error.response.status === 404 && error.response.request;
    // if error was caused by making a request to get movie and movie not found.
    if (isNotFoundError && error.response.request.path.includes("films")) {
      throw new NotFoundError("movie not found");
    } // if there was an error while getting the characters
    else if (
      isNotFoundError &&
      error.response.request.path.includes("people")
    ) {
      throw new NotFoundError(
        "can not get characters for this movie at the moment, pls try again later."
      );
    } // if swapi throws error for any other reason except from 404 error
    else if (error.request || error.code === "ENOTFOUND") {
      throw new FetchError("service not available");
    }
    // then error was caused from the application.
    throw new ApplicationError(error.message);
  }
};
