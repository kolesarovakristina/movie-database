import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'redux/configureStore';

const paginationSelector = (state: RootState) =>
  state.paginationReducer.pagination;
const totalResultsSelector = (state: RootState) =>
  state.paginationReducer.totalResults;
const searchedTermSelector = (state: RootState) =>
  state.paginationReducer.searchedTerm;

export const currentSearchedResultsSelector = createSelector(
  [paginationSelector, totalResultsSelector, searchedTermSelector],
  (pagination, totalResults, searchedTerm) => ({
    pagination,
    totalResults,
    searchedTerm,
  })
);
