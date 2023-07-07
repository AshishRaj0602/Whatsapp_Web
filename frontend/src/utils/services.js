import axios from "axios";
export const baseUrl = "https://ashish06.onrender.com/api";

export const postRequest = async (url, body) => {
  try {
    const data = await axios.post(`${baseUrl}/users/${url}`, body);
    if (data.status !== 201) {
      return { error: true, message: data.data.message,status:data.status };
    } else {
      return { error: false, message: "Success", data: data.data ,status:data.status };
    }
  } catch (error) {
    return { error: true, message: error.response.data.message, status:500};
  }
};

export const getRequest = async (url) => {
  try {
    const data = await axios.get(url);
    if (data.status !== 200) {
      return { error: true, message: data.data.message ,status: data.status };
    } else {
      return { error: false, message: "Success", data: data.data ,status:data.status};
    }
  } catch (error) {
    return { error: true, message: error.message,status:500 };
  }
};
