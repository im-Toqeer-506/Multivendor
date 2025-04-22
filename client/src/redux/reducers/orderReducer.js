import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  error: null,
  orders: [],
};
//create all products
export const orderReducer = createReducer(initialState, (builder) => {
  builder
    .addCase("getAllOrdersUserRequest", (state) => {
      state.isLoading = true;
    })
    .addCase("getAllOrdersUserSuccess", (state, action) => {
      state.isLoading = false;
      state.orders = action.payload;
      state.success = true;
    })
    .addCase("getAllOrdersUserFailed", (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      state.success = false;
    })
    .addCase("clearErrors", (state) => {
      state.error = null;
    });
});
