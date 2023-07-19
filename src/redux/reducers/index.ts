import { combineReducers } from '@reduxjs/toolkit';

import SearchedMoviesReducer from 'redux/reducers/searchedMoviesSlice';
import ErrorMessageReducer from 'redux/reducers/errorMessageSlice';
import FavoriteMoviesIdsReducer from 'redux/reducers/favoriteMoviesIdsSlice';

const rootReducer = combineReducers({
  searchedMoviesReducer: SearchedMoviesReducer,
  errorMessageReducer: ErrorMessageReducer,
  favoriteMoviesIdsReducer: FavoriteMoviesIdsReducer,
});

export default rootReducer;
