import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getProducers } from "../../services/producerService";

export const fetchProducers = createAsyncThunk("producers/fetchProducers", async () => {
  const response = await getProducers();
  return response.data.data;
});

const producerSlice = createSlice({
  name: "producers",
  initialState: { list: [], status: "idle" },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchProducers.fulfilled, (state, action) => {
      state.list = action.payload;
    });
  },
});

export default producerSlice.reducer;
