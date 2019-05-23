import axios from "axios";

export const fetch = axios.create({
  baseURL: "https://swapi.co/api/",
  timeout: 100000
});
