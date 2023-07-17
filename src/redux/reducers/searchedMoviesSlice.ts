import { createSlice } from '@reduxjs/toolkit';

const searchedMoviesSlice = createSlice({
  name: 'searchedMovies',
  initialState: { searchedMovies: [] },
  reducers: {
    setSearchedMovies(state, action) {
      state.searchedMovies = action.payload;
    },
  },
});

export const { setSearchedMovies } = searchedMoviesSlice.actions;

export default searchedMoviesSlice.reducer;
