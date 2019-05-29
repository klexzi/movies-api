import axios from "axios";

import { fetch } from "../config/axios";
import logger from "../config/logger";
import { filter, sort, toFeetAndInches } from "./utils";

/**
 *
 * @param {string} link
 */
const _getCharacter = async link => {
  try {
    const character = await axios.get(link);
    return character.data;
  } catch (error) {
    logger.debug(error.message);
    return null;
  }
};

/**
 *
 * @param {array} characterLinks
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
 * @param {array} characters
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
 * @param {number} movieId
 * @param {object} options
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
    logger.debug(error.message);
    return null;
  }
};
