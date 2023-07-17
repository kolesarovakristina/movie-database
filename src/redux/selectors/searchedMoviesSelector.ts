import { RootState } from 'redux/configureStore';

export const searchedMoviesSelector = (state: RootState) =>
  state.searchedMoviesReducer.searchedMovies;
