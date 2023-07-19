import { RootState } from 'redux/configureStore';

export const favoriteMoviesIdsSelector = (state: RootState) =>
  state.favoriteMoviesIdsReducer.favoriteMoviesIds;
