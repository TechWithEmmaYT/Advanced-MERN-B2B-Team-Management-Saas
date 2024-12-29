import API from "./axios-client";

export const getUserSessionQueryFn = async () => await API.get(`/user/current`);
