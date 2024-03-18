import { Movie } from "../../types/moive";
import { axiosInstance } from "../apiInstance";

export const getMovies = async (): Promise<Movie[]> => {
  const response = await axiosInstance.get(
    "/movie/now_playing?language=ko&page=1"
  );
  return response.data.results;
};
