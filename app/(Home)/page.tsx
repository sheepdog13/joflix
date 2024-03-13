import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import Screen from "../components/Screen/Screen";
import Detail from "../components/detail/Detail";

export interface Movie {
  backdrop_path: string;
  id: number;
  overview: string;
  title: string;
}

export const metadata = {
  title: "Home",
};

const getMovies = async () => {
  const response = await fetch(
    "https://nomad-movies.nomadcoders.workers.dev/movies"
  );
  return response.json();
};

export default async function Home(params: Params) {
  const movies: Movie[] = await getMovies();
  const id = params.searchParams.id;

  return (
    <>
      <Screen movie={movies[0]} />
      {id && (
        <>
          <Detail id={id} />
        </>
      )}
    </>
  );
}
