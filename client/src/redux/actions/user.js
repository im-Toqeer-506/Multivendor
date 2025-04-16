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
