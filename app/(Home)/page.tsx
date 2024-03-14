import styles from "./home.module.css";
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
    <div>
      <Screen movie={movies[0]} />
      <div className={styles.sliderBox}>
        <Slider movies={movies.slice(1)} />
      </div>
      {id && (
        <>
          <Detail id={id} />
        </>
      )}
    </div>
  );
}
