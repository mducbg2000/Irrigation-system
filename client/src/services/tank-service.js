import axios from "axios";

const token = window.localStorage.getItem("access_token");

const client = axios.create({
    baseURL: "http://localhost:3001",
});

const config = {
    headers: {
        Authorization: `Bearer ${token}`,
    },
}

export const getListTank = async () => {
    try {
        const response = await client.get("/tanks", config);
        return response.data;
    } catch (e) {
        console.log(e);
        return [];
    }
}