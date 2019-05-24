import { fetch } from "../../../config/axios";
import logger from "../../../config/logger";
import { getCharacterMeta } from "../../../helpers/utils";
export class Character {
  constructor() {
    this.data = {};
  }

  async list() {
    const key = "/characters";
    this.data = await fetch
      .get("people")
      .then(response => ({
        results: response.data.results
      }))
      .catch(reason => {
        logger.error(reason);
        let defaultRes = { results: [] };
        return new Query(defaultRes);
      });
    this.data.meta_data = getCharacterMeta(this.data.results);
    return new Query(this.data);
  }
}

class Query {
  /**
   *
   * @param {object} data
   */
  constructor(data) {
    this.data = data;
    this.value = this.data;
  }

  get val() {
    return this.value;
  }
  /**
   *
   * @param {string} sortBy
   * @param {string} order
   */
  sort(sortBy, order = "asc") {
    this.value.results = this.data.results.sort((a, b) => {
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
    this.value.meta_data = getCharacterMeta(this.value.results);
    return this;
  }

  /**
   *
   * @param {string} filterBy
   * @param {string} filterValue
   */

  filter(filterBy, filterValue) {
    this.value.results = this.data.results.filter(
      result => result[filterBy] === filterValue
    );
    this.value.meta_data = getCharacterMeta(this.value.results);
    return this;
  }
}
