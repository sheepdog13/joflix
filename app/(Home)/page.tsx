import Link from "next/link";
import Screen from "../components/Screen/Screen";

export const metadata = {
  title: "Home",
};
export const baseurl = "https://nomad-movies.nomadcoders.workers.dev/movies";
const getMovies = async () => {
  const response = await fetch(baseurl);
  return response.json();
};

export default async function home() {
  const movies = await getMovies();
  return (
    <>
      <Screen
        backdrop_path={movies[0].backdrop_path}
        id={movies[0].id}
        overview={movies[0].overview}
        title={movies[0].title}
      />
      <ul>
        {movies.map((movie) => (
          <Link href={`/movie/${movie.id}`}>
            <li style={{ height: "100px" }} key={movie.id}>
              {movie.title}
            </li>
          </Link>
        ))}
      </ul>
    </>
  );
}
