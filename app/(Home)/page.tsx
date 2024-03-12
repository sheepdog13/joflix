import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import Screen from "../components/Screen/Screen";
import Modal from "../components/modal/Modal";

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
  const movies = await getMovies();
  const id = params.searchParams.id;

  return (
    <>
      <Screen
        backdrop_path={movies[0].backdrop_path}
        id={movies[0].id}
        overview={movies[0].overview}
        title={movies[0].title}
      />
      {id && (
        <>
          <Modal id={id} />
        </>
      )}
    </>
  );
}
