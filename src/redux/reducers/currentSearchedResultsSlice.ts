import { createSlice } from '@reduxjs/toolkit';

const currentSearchedResultsSlice = createSlice({
  name: 'pagination',
  initialState: { searchedTerm: '', pagination: 1, totalResults: '0' },
  reducers: {
    setPagination(state, action: { payload: number }) {
      state.pagination = action.payload;
    },
    setTotalResults(state, action: { payload: string }) {
      state.totalResults = action.payload;
    },
    setResultsAndTerm(state, action) {
      state.searchedTerm = action.payload.searchedTerm;
      state.totalResults = action.payload.totalResults;
    },
  },
});

export const { setResultsAndTerm, setPagination, setTotalResults } =
  currentSearchedResultsSlice.actions;

export default currentSearchedResultsSlice.reducer;
