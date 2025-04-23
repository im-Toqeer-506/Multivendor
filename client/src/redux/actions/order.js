import axios from "axios";
import { server } from "../../server";
export const getAllOrdersOfUser = (userId) => async (dispatch) => {
  try {
    dispatch({
      type: "getAllOrdersUserRequest",
      isLoading: true,
    });
    const { data } = await axios.get(
      `${server}/order/get-all-orders/${userId}`
    );
    dispatch({
      type: "getAllOrdersUserSuccess",
      payload: data.orders,
    });
  } catch (error) {
    dispatch({
      type: "getAllOrdersUserFailed",
      payload: error.response.data.message,
    });
  }
};

export const getAllOrdersOfShop = (SellerId) => async (dispatch) => {
  try {
    dispatch({
      type: "getAllOrdersSellerRequest",
      isLoading: true,
    });
    const { data } = await axios.get(
      `${server}/order/get-seller-all-orders/${SellerId}`
    );
    dispatch({
      type: "getAllOrdersSellerSuccess",
      payload: data.orders,
    });
  } catch (error) {
    dispatch({
      type: "getAllOrdersSellerFailed",
      payload: error.response.data.message,
    });
  }
};
