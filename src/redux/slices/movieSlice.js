import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getMovies, createMovie, updateMovie, deleteMovie } from "../../services/movieService.js";

// Fetch movies
export const fetchMovies = createAsyncThunk("movies/fetchMovies", async () => {
  const response = await getMovies();
  console.log("Fetched Movies:", response.data);
  return response.data.data;
});

// Add a new movie
export const addMovieAsync = createAsyncThunk("movies/addMovie", async (movie) => {
  const response = await createMovie(movie);
  console.log("Added Movie:", response.data);
  return response.data.data;
});

// Update a movie
export const updateMovieAsync = createAsyncThunk(
  "movies/updateMovie",
  async (movieData, { rejectWithValue }) => {
    try {
      const response = await updateMovie(movieData);
      console.log("Updated Movie:", response.data);
      return response.data;
    } catch (error) {
      console.error("Update Movie Error:", error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);

// Delete a movie
export const deleteMovieAsync = createAsyncThunk("movies/deleteMovie", async (movieId) => {
  await deleteMovie(movieId);
  console.log(`Deleted Movie ID: ${movieId}`);
  return movieId;
});

// Movie slice
const movieSlice = createSlice({
  name: "movies",
  initialState: { list: [], status: "idle" },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.list = action.payload;
      })
      .addCase(addMovieAsync.fulfilled, (state, action) => {
        state.list.push(action.payload);
      })
      .addCase(updateMovieAsync.fulfilled, (state, action) => {
        state.list = state.list.map((movie) =>
          movie._id === action.payload._id ? action.payload : movie
        );
      })
      .addCase(deleteMovieAsync.fulfilled, (state, action) => {
        state.list = state.list.filter((movie) => movie._id !== action.payload);
      });
  },
});

export default movieSlice.reducer;
