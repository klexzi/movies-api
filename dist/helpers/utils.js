"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getCharacterMeta = void 0;

/**
 *
 * @param {number} value
 */
var toFeetAndInches = function toFeetAndInches(value) {
  var aFootInCm = 30.48;
  var aFootInInches = 12;
  var feet = value / aFootInCm;
  feet = feet.toFixed(5);
  var remainder = feet % 1;
  var inches = remainder * aFootInInches;
  inches = inches.toFixed(2);
  feet = Math.trunc(feet);
  return "".concat(feet, "ft and ").concat(inches, " inches.");
};
/**
 *
 * @param {array} characters
 */


var getCharacterMeta = function getCharacterMeta(characters) {
  var totalHeightInCm = characters.reduce(function (total, character) {
    return total + +character.height;
  }, 0);
  var totalHeightInFeet = toFeetAndInches(+totalHeightInCm);
  var totalCharacters = characters.length;
  return {
    totalHeightInCm: totalHeightInCm,
    totalHeightInFeet: totalHeightInFeet,
    totalCharacters: totalCharacters
  };
};

exports.getCharacterMeta = getCharacterMeta;