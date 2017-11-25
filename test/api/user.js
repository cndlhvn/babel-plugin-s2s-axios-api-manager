import axios from "../axiosConfig";
export const getCoinsRequest = config => axios.get("", config);
