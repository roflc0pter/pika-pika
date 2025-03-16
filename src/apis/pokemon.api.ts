import axiosInstance from "libs/axios-service";
import { TPaginated, TQueryParams } from "types/query.type";
import { ITypeData } from "types/type-data.type";
import { IPokemon } from "types/pokemon.type";

export const fetchPokemons = async (
  params?: TQueryParams,
): Promise<TPaginated> => {
  return axiosInstance.get(`/pokemon`, { params });
};

export const fetchPokemon = async (name: string): Promise<IPokemon> => {
  return axiosInstance.get(`/pokemon/${name}`);
};

export const fetchType = async (type: string): Promise<ITypeData> => {
  return axiosInstance.get(`/type/${type}`);
};
