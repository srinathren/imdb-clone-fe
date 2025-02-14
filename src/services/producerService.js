import axios from "axios";
import BASE_URL from "../config.js"

const API = axios.create({ baseURL: `${BASE_URL}` });

export const getProducers = () => API.get("/producers");
export const createProducer = (producer) => API.post("/producers", producer);
