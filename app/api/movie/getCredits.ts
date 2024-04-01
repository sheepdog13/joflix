import { axiosInstance } from '../apiInstance';

export interface Credits {
  gender: number;
  id: number;
  name: string;
}

export const getCredits = async (id: number | string): Promise<Credits[]> => {
  const response = await axiosInstance.get(`movie/${id}/credits?language=ko`);
  return response.data.cast;
};
