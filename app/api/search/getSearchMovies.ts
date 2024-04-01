import { Movie } from '../../types/moive';
import { axiosInstance } from '../apiInstance';
export const getSearchMovies = async (keyword: string): Promise<Movie[]> => {
  const response = await axiosInstance.get(`/search/movie?query=${keyword}&include_adult=false&language=ko&page=1`);

  return response.data.results;
};
