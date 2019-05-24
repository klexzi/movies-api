/**
 *
 * @param {number} value
 */
const toFeetAndInches = value => {
  const aFootInCm = 30.48;
  const aFootInInches = 12;
  let feet = value / aFootInCm;
  feet = feet.toFixed(5);
  const remainder = feet % 1;
  let inches = remainder * aFootInInches;
  inches = inches.toFixed(2);
  feet = Math.trunc(feet);

  return `${feet}ft and ${inches} inches.`;
};
/**
 *
 * @param {array} characters
 */
export const getCharacterMeta = characters => {
  const totalHeightInCm = characters.reduce(
    (total, character) => total + +character.height,
    0
  );
  const totalHeightInFeet = toFeetAndInches(+totalHeightInCm);
  const totalCharacters = characters.length;
  return { totalHeightInCm, totalHeightInFeet, totalCharacters };
};
