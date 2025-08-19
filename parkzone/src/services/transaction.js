import axios from "axios";
import { createUrl } from "../Utils";
export async function getTransactionById(id) {
    try {
      const url = createUrl(`transactions/${id}`)
      const token = sessionStorage.getItem("jwt"); 
      const response = await axios.get(url, {
      headers: {
        Authorization: token || "",
      },
    });
    console.log(response)
      return response
    } catch (ex) {
      return { status: 'error', error: ex }
    }
  }