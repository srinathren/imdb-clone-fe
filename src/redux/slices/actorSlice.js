import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getActors } from "../../services/actorService";

export const fetchActors = createAsyncThunk("actors/fetchActors", async () => {
  const response = await getActors();
  return response.data.data;
});

const actorSlice = createSlice({
  name: "actors",
  initialState: { list: [], status: "idle" },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchActors.fulfilled, (state, action) => {
      state.list = action.payload;
    });
  },
});

export default actorSlice.reducer;
