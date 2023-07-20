import { RootState } from 'redux/configureStore';
import { createSelector } from '@reduxjs/toolkit';

const getFavoriteMoviesIdsSelector = (state: RootState) =>
  state.favoriteMoviesIdsReducer.favoriteMoviesIds;

export const favoriteMoviesIdsSelector = createSelector(
  [getFavoriteMoviesIdsSelector],
  favoriteMoviesIds => favoriteMoviesIds
);
