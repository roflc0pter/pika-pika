import axiosInstance from "libs/axios-service";
import { IAbility } from "types/ability.type";

export const fetchAbility = async (ability: string): Promise<IAbility> => {
  return axiosInstance.get(`/ability/${ability}`);
};
