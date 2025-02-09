import { createReducer } from "@reduxjs/toolkit";

const initialState = {
    isAuthenticated: false,
    loading: false,
    error: null,
    user: null
};
//builder callback notation
export const userReducer = createReducer(initialState, (builder) => {
    builder
        .addCase("LoadUserRequest", (state) => {
            state.loading = true;
        })
        .addCase("LoadUserSuccess", (state, action) => {
            state.loading = false;
            state.isAuthenticated = true;
            state.user = action.payload;
        })
        .addCase("LoadUserFail", (state, action) => {
            state.loading = false;
            state.error = action.payload;
            state.isAuthenticated = false;
        })
        .addCase("clearErrors", (state) => {
            state.error = null;
        });
});