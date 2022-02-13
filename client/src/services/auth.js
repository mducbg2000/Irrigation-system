import axios from "axios";

const storage = window.localStorage;

const client = axios.create({
    baseURL: "http://localhost:3001",
});

export const register = (username, password) => {
    client
        .post("/register", {username: username, password: password})
        .then(response => {
            console.log(response.data);
        })
}

export const login = async (username, password) => {
    try {
        const response = await client.post("/login", {username: username, password: password})
        console.log(response)
        storage.setItem("access_token", response.data.access_token);
        return true;
    } catch (e) {
        console.log(e);
        return false;
    }

};

export const logout = () => {
    storage.removeItem("access_token");
};

export const getCurrentUser = async () => {
    try {
        const token = storage.getItem("access_token");
        if (token == null) return null;
        const response = await client.get("/whoami", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        return response.data;
    } catch (e) {
        console.log(e);
        return null;
    }

};
