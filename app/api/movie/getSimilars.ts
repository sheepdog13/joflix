import { Movie } from '../../types/moive';
import { axiosInstance } from '../apiInstance';
export const getSimilars = async (id: string, category?: string): Promise<Movie[]> => {
  const response = await axiosInstance.get(`/movie/${id}/${category ? category : 'similar'}?language=ko&page=1`);

  return response.data.results;
};
