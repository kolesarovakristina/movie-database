import { combineReducers } from '@reduxjs/toolkit';

import ErrorMessageReducer from 'redux/reducers/errorMessageSlice';
import FavoriteMoviesIdsReducer from 'redux/reducers/favoriteMoviesIdsSlice';
import PaginationReducer from 'redux/reducers/currentSearchedResultsSlice';

const rootReducer = combineReducers({
  errorMessageReducer: ErrorMessageReducer,
  favoriteMoviesIdsReducer: FavoriteMoviesIdsReducer,
  paginationReducer: PaginationReducer,
});

export default rootReducer;
