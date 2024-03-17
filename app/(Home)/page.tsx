import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import Screen from "../components/Screen/Screen";
import Detail from "../components/Detail/Detail";
import Slider from "../components/Slider/Slider";
import { getMovie } from "../api/movie/getMoive";
import { getMovies } from "../api/movie/getMovies";
import { getSimilars } from "../api/movie/getSimilars";

export interface Movie {
  backdrop_path: string;
  id: number;
  overview: string;
  title: string;
  release_date: string;
}

export const metadata = {
  title: "Home",
};

export default async function Home(params: Params) {
  const movies: Movie[] = await getMovies();
  const movie: Movie = await getMovie(1062807);
  const animoives: Movie[] = await getSimilars("1062807");
  const id = params.searchParams.id;
  return (
    <div>
      <Screen movie={movie} />
      <div className=" absolute w-full pb-5 top-3/4">
        <Slider movies={movies} />
        <Slider movies={animoives} />
      </div>
      {id && (
        <>
          <Detail id={id} />
        </>
      )}
    </div>
  );
}
