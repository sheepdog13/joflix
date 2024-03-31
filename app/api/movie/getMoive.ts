import { DetailMovie } from '../../types/detailMoive';
import { axiosInstance } from '../apiInstance';

export const getMovie = async (id: number | string): Promise<DetailMovie> => {
  try {
    const response = await axiosInstance.get(`/movie/${id}?language=ko`);
    return response.data;
  } catch (err) {
    return;
  }
};
