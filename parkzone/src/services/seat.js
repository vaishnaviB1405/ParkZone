import axios from "axios";
import { createUrl } from "../Utils";
export const fetchBookedSeats = async (locationId) => {
    try {
        const url = createUrl(`seats/${locationId}`);
        const token = sessionStorage.getItem("jwt");
        const response = await axios.get(url,{
            headers: { Authorization: token || "" },
        });
        console.log(response.data)
      return response.data || [];
    } catch (error) {
      console.error("Error fetching booked seats:", error);
      throw error;
    }
  };