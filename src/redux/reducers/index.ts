import { combineReducers } from '@reduxjs/toolkit';

import SearchedMoviesReducer from 'redux/reducers/searchedMoviesSlice';
import ErrorMessageReducer from 'redux/reducers/errorMessageSlice';

const rootReducer = combineReducers({
  searchedMoviesReducer: SearchedMoviesReducer,
  errorMessageReducer: ErrorMessageReducer,
});

export default rootReducer;
