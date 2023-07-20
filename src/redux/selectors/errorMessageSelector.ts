import { RootState } from 'redux/configureStore';
import { createSelector } from '@reduxjs/toolkit';

export const getErrorMessageSelector = (state: RootState) =>
  state.errorMessageReducer.errorMessage;

export const errorMessageSelector = createSelector(
  [getErrorMessageSelector],
  errorMessage => errorMessage
);
