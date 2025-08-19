import axios from 'axios'
import { createUrl } from '../Utils'
export async function addLocation(locationData) {
    try {
      const url = createUrl('location/')
      const token = sessionStorage.getItem("jwt");
      const response = await axios.post(url, locationData ,{
        headers: {
          Authorization: token || "",
        },
      });
      return response
    } catch (ex) {
      return { status: 'error', error: ex }
    }
  }
  export async function getAllLocations() {
    try {
      const url = createUrl('location/')
      const token = sessionStorage.getItem("jwt"); 
      const response = await axios.get(url, {
      headers: {
        Authorization: token || "",
      },
    });
      return response
    } catch (ex) {
      return { status: 'error', error: ex }
    }
  }
  export async function updateLocationStatus(id) {
    try {
        const url = createUrl(`location/status/${id}`);
        const token = sessionStorage.getItem("jwt");
        const response = await axios.put(url,null,{
          headers: {
            Authorization: token || "",
          },
        });
        return response;
    } catch (ex) {
        return { status: 'error', error: ex };
    }
}
export async function getLocationById(id) {
    try {
        const url = createUrl(`location/${id}`);
        const token = sessionStorage.getItem("jwt");
        const response = await axios.get(url,{
          headers: {
            Authorization: token || "",
          },
        });
        return response;
    } catch (ex) {
        return { status: 'error', error: ex };
    }
}
export async function updateLocationDetails(location,id) {
    try {
        const url = createUrl(`location/update/${id}`);
        const token = sessionStorage.getItem("jwt");
        const response = await axios.put(url,location,{
          headers: {
            Authorization: token || "",
          },
        });
        return response;
    } catch (ex) {
        return { status: 'error', error: ex };
    }
}
export async function fetchLocations(location) {
  try {
      const url = createUrl(`location/city/${location}`);
      const token = sessionStorage.getItem("jwt");
      const response = await axios.get(url,{
        headers: {
          Authorization: token || "",
        },
      });
      return response.data;
  } catch (ex) {
      return { status: 'error', error: ex };
  }
}