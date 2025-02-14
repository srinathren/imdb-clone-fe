import axios from "axios";
import BASE_URL from "../config.js"

const API = axios.create({ baseURL: `${BASE_URL}` });

export const getMovies = () => API.get("/movies");
export const getMovieById = (id) => API.get(`/movies/${id}`);
export const createMovie = (movie) => API.post("/movies", movie);
export const updateMovie = (id, movie) => API.put(`/movies/${id}`, movie);
export const deleteMovie = (id) => API.delete(`/movies/${id}`);
