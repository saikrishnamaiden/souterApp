import axios from "axios";
import { URLs } from "./configuration";

axios.defaults.baseURL = "http://localhost:3050/";

// Comment Above line and use below line for working with live URL.
//axios.defaults.baseURL = 'https://drdev.azurewebsites.net/api/v1/';

axios.defaults.headers.common["Content-Type"] =
  "application/json";

export default class API {
  static getCity = param => {
    return axios.get(URLs.getCity);
  };
  static getEvents = param => {
    return axios.get(URLs.getEvents);
  };
    static getFeebacks = param => {
      return axios.get(URLs.getFeebacks);
  };
  static getComments = param => {
    return axios.get(URLs.getComments);
};
}
