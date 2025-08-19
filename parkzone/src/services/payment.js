import axios from "axios";
import { createUrl } from "../Utils";


export const processPayment = async (transactionData) => {
  try {
    console.log(transactionData)
    const url = createUrl(`reservation/`);
    const token = sessionStorage.getItem("jwt");
    const response = await axios.post(url,transactionData,{
            headers: { Authorization: token || "" },
        });
    console.log(response.data)
    return response.data; 
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};

