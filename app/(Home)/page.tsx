import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import Screen from "../components/Screen/Screen";
import Detail from "../components/detail/Detail";
import Slider from "../components/Slider/Slider";

export interface Movie {
  backdrop_path: string;
  id: number;
  overview: string;
  title: string;
}

export const metadata = {
  title: "Home",
};

const getMovie = async () => {
  const response = await fetch(
    `https://nomad-movies.nomadcoders.workers.dev/movies/1062807`
  );
  return response.json();
};

const getMovies = async () => {
  const response = await fetch(
    "https://nomad-movies.nomadcoders.workers.dev/movies"
  );
  return response.json();
};

export default async function Home(params: Params) {
  const movies: Movie[] = await getMovies();
  const movie: Movie = await getMovie();
  const id = params.searchParams.id;

  return (
    <div>
      <Screen movie={movie} />
      <div className=" absolute w-full pb-5 top-3/4">
        <Slider movies={movies} />
      </div>
      {id && (
        <>
          <Detail id={id} />
        </>
      )}
    </div>
  );
}
