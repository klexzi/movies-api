/**
 *
 * @param {number} value
 */
export const toFeetAndInches = value => {
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
 * @param {array} data
 * @param {string} sortBy
 * @param {string} order
 */
export const sort = (data, sortBy, order) => {
  return data.sort((a, b) => {
    const valA = isNaN(+a[sortBy]) ? a[sortBy].toLowerCase() : +a[sortBy];
    const valB = isNaN(+b[sortBy]) ? b[sortBy].toLowerCase() : +b[sortBy];
    if (order === "desc") {
      if (valA > valB) return -1;
      if (valA < valB) return 1;
      return 0;
    } else {
      if (valA < valB) return -1;
      if (valA > valB) return 1;
      return 0;
    }
  });
};

/**
 *
 * @param {array} data
 * @param {string} filterBy
 * @param {string} filterValue
 */
export const filter = (data, filterBy, filterValue) => {
  return data.filter(result => result[filterBy] === filterValue);
};
