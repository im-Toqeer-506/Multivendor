import axios from "axios";
import { server } from "../../server.js";
//get-user
export const getUser = () => async (dispatch) => {
  try {
    dispatch({
      type: "LoadUserRequest",
    });
    const { data } = await axios.get(`${server}/user/get-user`, {
      withCredentials: true,
    });
    dispatch({
      type: "LoadUserSuccess",
      payload: data.user,
    });
  } catch (error) {
    dispatch({
      type: "LoadUserFail",
      payload: error.response.data.message,
    });
  }
};
//Update User info
export const updateUserInfo = ({
  name,
  email,
  password,
  phoneNumber,
}) => async (dispatch) => {
  try {
    dispatch({
      type: "updateUserInfoRequest",
    });
    const { data } = await axios.put(
      `${server}/user/update-user-info`,
      { name, email, password, phoneNumber },
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    dispatch({
      type: "updateUserInfoSuccess",
      payload: data.user,
    });
  } catch (error) {
    dispatch({
      type: "updateUserInfoFailure",
      payload: error.response.data.message,
    });
  }
};

//Update User Addresses
export const updateUserAddress = ({
  country,
  city,
  address1,
  address2,
  addressType,
}) => async (dispatch) => {
  try {
    dispatch({
      type: "updateUserAddressRequest",
    });
    const { data } = await axios.put(
      `${server}/user/update-user-addresses`,
      {
        country,
        city,
        address1,
        address2,
        addressType,
      },
      { withCredentials: true }
    );
    dispatch({
      type: "updateUserAddressSuccess",
      payload: {
        successMessage: "User address updated successfully!",
        user: data.user,
      },
    });
  } catch (error) {
    dispatch({
      type: "updateUserAddressFailure",
      payload: error.response?.data?.message,
    });
  }
};
//delete user address
export const deleteUserAddress = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "deleteUserAddressRequest",
    });
    const data = await axios.delete(
      `${server}/user/delete-user-address/${id} `,
      { withCredentials: true }
    );
    dispatch({
      type: "deleteUserAddressSuccess",
      payload: {
        successMessage: "User address deleted successfully!",
        user: data.user,
      },
    });
  } catch (error) {
    dispatch({
      type: "deleteUserAddressFailure",
      payload: error.response?.data?.message,
    });
  }
};
