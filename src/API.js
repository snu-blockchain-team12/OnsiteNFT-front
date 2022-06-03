import axios from "axios";

const API = axios.create({
  //baseURL: "http://127.0.0.1:5000",
  baseURL: "http://13.209.127.113",
  withCredentials: true,
});
axios.defaults.crossDomain = true;
axios.defaults.withCredentials  = true;

export default API;