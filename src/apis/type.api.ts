import axiosInstance from "libs/axios-service";
import { ITypeData } from "types/type-data.type";

export const fetchType = async (type: string): Promise<ITypeData> => {
  return axiosInstance.get(`/type/${type}`);
};
