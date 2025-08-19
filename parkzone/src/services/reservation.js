import axios from "axios";
import { createUrl } from "../Utils";

export const getAllReservations = async () => {
  try {
    const url = createUrl(`reservation/all`);
    const token = sessionStorage.getItem("jwt");
    const response = await axios.get(url,{
            headers: { Authorization: token || "" },
        });
    console.log(response.data)
    return response.data;
  } catch (error) {
    console.error("Error fetching reservations:", error);
    throw error;
  }
};
export const getMyReservations = async () => {
  try {
    const id = sessionStorage.getItem("id");
    const url = createUrl(`reservation/user/${id}`);
    const token = sessionStorage.getItem("jwt");
    const response = await axios.get(url,{
            headers: { Authorization: token || "" },
        });
    console.log(response.data)
    return response.data;
  } catch (error) {
    console.error("Error fetching reservations:", error);
    throw error;
  }
};
export const cancelReservation = async (rid) => {
  try {
    const uid = sessionStorage.getItem("id");
    const url = createUrl(`reservation/cancel/${uid}/${rid}`);
    const token = sessionStorage.getItem("jwt");
    const response = await axios.put(url,null,{
            headers: { Authorization: token || "" },
        });
    return response
  } catch (error) {
    console.error("Error fetching reservations:", error);
    throw error;
  }
};
