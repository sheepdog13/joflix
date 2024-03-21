import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import Screen from "../components/Screen/Screen";
import Slider from "../components/Slider/Slider";
import { getMovie } from "../api/movie/getMoive";
import { getMovies } from "../api/movie/getMovies";
import { getSimilars } from "../api/movie/getSimilars";
import Detail from "../components/Detail/Modal";

export const metadata = {
  title: "Home",
};

export default async function Home(params: Params) {
  const movies = await getMovies();
  const movie = await getMovie(1062807);
  const topRated = await getMovies("top_rated");
  const test = await getSimilars("1062807", "recommendations");

  const id = params.searchParams.id;
  return (
    <div>
      <Screen movie={movie} />
      <div className=" absolute w-full pb-5 top-3/4">
        <Slider movies={movies} title="지금 뜨는 콘텐츠" />
        <Slider movies={test} title="SF & 액션 판타지" />

        <Slider movies={topRated} title="보고 또 봐도 좋은 명작" />
      </div>
      {id && (
        <>
          <Detail id={id} />
        </>
      )}
    </div>
  );
}
