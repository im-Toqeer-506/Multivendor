import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  isAthuenticated: false,
  loading: false,
  error: null,
  user: null,
};
// builder callback notation
export const userReducer = createReducer(initialState, (builder) => {
  builder
    .addCase("LoadUserRequest", (state) => {
      state.loading = true;
    })
    .addCase("LoadUserSuccess", (state, action) => {
      state.isAthuenticated = true;
      state.loading = false;
      state.user = action.payload;
    })
    .addCase("LoadUserFail", (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.isAthuenticated = false;
    })
    .addCase("ClearError", (state) => {
      state.error = null;
    });
});
