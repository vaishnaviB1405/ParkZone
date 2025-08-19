import axios from 'axios'
import { createUrl } from '../Utils'
export async function signin(email, password) {
    try {
      const body = { email, password }
      const url = createUrl('users/login')
      return await axios.post(url, body)
    } catch (ex) {
      return { status: 'error', error: ex }
    }
  }
  export async function signup(signupData) {
    try {
      const url = createUrl('users/register')
      const response = await axios.post(url, signupData)
      return response
    } catch (ex) {
      return { status: 'error', error: ex }
    }
  }
  export async function addEmployee(signupData) {
    try {
      const url = createUrl('users/register')
      const response = await axios.post(url, signupData)
      return response
    } catch (ex) {
      return { status: 'error', error: ex }
    }
  }
  export async function sendOtp(email) {
    try {
      const url = createUrl('email')
      const response = await axios.post(url,email,{
        headers: { 'Content-Type': 'application/json' }})
      return response
    } catch (ex) {
      return { status: 'error', error: ex }
    }
  }
  export async function resetPassword(data) {
    try {
      console.log(data)
      const url = createUrl('users/password')
      const response = await axios.post(url,data)
      return response
    } catch (ex) {
      return { status: 'error', error: ex }
    }
  }
  export async function getUsers() {
    try {
      const url = createUrl('users/')
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
  export async function getUserById(id) {
    try {
      const url = createUrl(`users/${id}`)
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
  export async function blockUnblockUsers(id) {
    try {
        const url = createUrl(`users/status/${id}`);
        const token = sessionStorage.getItem("jwt");
        const response = await axios.put(url, null ,{
          headers: {
            Authorization: token || "",
          },
        });
        return response;
    } catch (ex) {
        return { status: 'error', error: ex };
    }
}


  