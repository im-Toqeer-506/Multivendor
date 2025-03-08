import axios from "axios";
import { server } from "../../server";
//create-event
export const createEvent = (newForm) => async (dispatch) => {
  try {
    dispatch({
      type: "eventCreateRequest",
    });
    const config = { header: { "Content-Type": "multipart/form-data" } };
    const { data } = await axios.post(
      `${server}/event/create-event`,
      newForm,
      config
    );
    dispatch({
      type: "eventCreateSuccess",
      payload: data.product,
    });
  } catch (error) {
    dispatch({
      type: "eventCreateFail",
      payload: error.response.data.message,
    });
  }
};
