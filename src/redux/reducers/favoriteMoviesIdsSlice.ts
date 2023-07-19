import { createSlice } from '@reduxjs/toolkit';
import {
  getFavoriteMoviesIds,
  setFavoriteMoviesIds,
} from 'localStorage/favoriteMoviesIds';

const favoriteMoviesIdsSlice = createSlice({
  name: 'favoriteMoviesIds',
  initialState: {
    favoriteMoviesIds: JSON.parse(getFavoriteMoviesIds() as string) || [],
  },
  reducers: {
    addToFavorites(state, action) {
      state.favoriteMoviesIds = [...state.favoriteMoviesIds, action.payload];

      setFavoriteMoviesIds(JSON.stringify(state.favoriteMoviesIds));
    },

    removeFromFavorites(state, action) {
      state.favoriteMoviesIds = state.favoriteMoviesIds.filter(
        (imdbID: string) => imdbID !== action.payload
      );

      setFavoriteMoviesIds(JSON.stringify(state.favoriteMoviesIds));
    },
  },
});

export const { addToFavorites, removeFromFavorites } =
  favoriteMoviesIdsSlice.actions;

export default favoriteMoviesIdsSlice.reducer;
