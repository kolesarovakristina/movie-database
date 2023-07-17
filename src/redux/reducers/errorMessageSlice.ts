import { createSlice } from '@reduxjs/toolkit';

const errorMessageSlice = createSlice({
  name: 'error',
  initialState: { errorMessage: null },
  reducers: {
    setErrorMessage(state, action) {
      state.errorMessage = action.payload;
    },
  },
});

export const { setErrorMessage } = errorMessageSlice.actions;

export default errorMessageSlice.reducer;
