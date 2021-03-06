import axios from "axios";
import io from "socket.io-client";

export const LOCAL_URL = "http://localhost:3001"
export const NGROK_URL = "http://01b5-2001-ee0-7257-c3d0-a4bc-5f09-e294-8142.ngrok.io"
export const token = window.localStorage.getItem("access_token");

export const client = axios.create({
  baseURL: LOCAL_URL,
});

export const authConfig = {
  headers: {
    Authorization: `Bearer ${token}`,
  },
}

export const socket = io(LOCAL_URL);
