/**
 * Converts centimeter to feet/inches.
 * @param {number} value the value in centimeters to convert to feet.
 * @access public
 * @return {string}
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
 * Sorts the data by the arguments specified.
 * @param {array} data the array of object data to sort.
 * @param {string} sortBy specify the object key to sort by.
 * @param {string} order specify the direction of sorting, either asc for ascending or desc for descending.
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
 * Filters the data by arguments specified.
 * @param {array} data the array of object data to sort.
 * @param {string} filterBy specify the object key to filter by.
 * @param {string} filterValue the value to run the filter on.
 * @access public
 * @public
 */
export const filter = (data, filterBy, filterValue) => {
  return data.filter(result => result[filterBy] === filterValue);
};
