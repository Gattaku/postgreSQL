import axiosClient from "./axiosClient";

const dbApi = {
    getAll: () => axiosClient.get("users"),
    createNewDB: (params) => axiosClient.post("users", params),
    deleteDB: (id) => axiosClient.delete(`users/${id}`),
    updateName: (id, params) => axiosClient.put(`users/${id}`, params),
}

export default dbApi;