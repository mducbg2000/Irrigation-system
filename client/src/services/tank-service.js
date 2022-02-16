
import { authConfig, client } from "./conf";

export const getListTank = async () => {
    try {
        const response = await client.get("/tanks", authConfig);
        return response.data;
    } catch (e) {
        console.log(e);
        return [];
    }
}