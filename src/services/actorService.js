import axios from "axios";
import BASE_URL from "../config.js"

const API = axios.create({ baseURL: `${BASE_URL}` });

export const getActors = () => API.get("/actors");
export const createActor = (actor) => API.post("/actors", actor);
