import { authConfig, client } from "./conf";


export const getListTree = async () => {
  try {
    const response = await client.get("/trees", authConfig);
    return response.data;
  } catch (e) {
    console.log(e);
    return [];
  }
};

export const waterTree = async ({ espId, index, isValveOpen }) => {
  try {
    const response = await client.post("/sensors/water-tree", { espId, index, isValveOpen }, authConfig);
    return response.data;
  } catch (e) {
    console.log(e);
  }
};