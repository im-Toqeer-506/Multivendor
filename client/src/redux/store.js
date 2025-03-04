import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./reducers/userReducer";
import { sellerReducer } from "./reducers/sellerReducer";
import { productReducer } from "./reducers/productReducer";
export const store = configureStore({
  reducer: {
    user: userReducer,
    seller: sellerReducer,
    products:productReducer,
  },
});
export default store;
