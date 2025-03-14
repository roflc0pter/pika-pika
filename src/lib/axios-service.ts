import axios, { AxiosInstance, AxiosResponse } from "axios";

const API_BASE_URL = "https://pokeapi.co/api/v2";

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
});

const onResponse = (response: AxiosResponse): AxiosResponse["data"] => {
  return response.data;
};

export function setupInterceptorsTo(
  axiosInstance: AxiosInstance,
): AxiosInstance {
  axiosInstance.interceptors.response.use(onResponse);
  return axiosInstance;
}

setupInterceptorsTo(axiosInstance);

export default axiosInstance;
