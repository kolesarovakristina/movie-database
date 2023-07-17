import { RootState } from 'redux/configureStore';

export const errorMessageSelector = (state: RootState) =>
  state.errorMessageReducer.errorMessage;
