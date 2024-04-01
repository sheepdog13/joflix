import { Movie } from '../../types/moive';
import { axiosInstance } from '../apiInstance';

export const getMovies = async (category?: string): Promise<Movie[]> => {
  const response = await axiosInstance.get(`/movie/${category ? category : 'now_playing'}?language=ko&page=1`);
  return response.data.results;
};
