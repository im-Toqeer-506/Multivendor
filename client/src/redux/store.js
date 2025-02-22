import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./reducers/userReducer";
import { sellerReducer } from "./reducers/sellerReducer";
export const store = configureStore({
  reducer: {
    user: userReducer,
    seller: sellerReducer,
  },
});
export default store;
