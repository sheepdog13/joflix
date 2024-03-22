import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import Screen from "../components/Screen/Screen";
import Slider from "../components/Slider/Slider";
import { getMovie } from "../api/movie/getMoive";
import { getMovies } from "../api/movie/getMovies";
import { getSimilars } from "../api/movie/getSimilars";
import Detail from "../components/Detail/Detail";
import { makeImagePath } from "../utils/makeImgPath";
import { Metadata } from "next";

export async function generateMetadata(params: Params): Promise<Metadata> {
  const id = params.searchParams.id;
  const movie = await getMovie(id);
  const idImg = movie?.poster_path
    ? makeImagePath(movie.poster_path) || makeImagePath(movie.backdrop_path)
    : "/img/bond.webp";
  return {
    title: `${id ? movie.title : "홈페이지"}`,
    description: `${id ? movie.overview : "nexflix 클론코딩 사이트" || ""}`,
    openGraph: {
      images: `${id ? idImg : "/img/homepreview.png"}`,
    },
  };
}

export default async function Home(params: Params) {
  const movies = await getMovies();
  const movie = await getMovie(1062807);
  const topRated = await getMovies("top_rated");
  const test = await getSimilars("1062807", "recommendations");
  const id = params.searchParams.id;

  return (
    <main className=" overflow-y-hidden">
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
    </main>
  );
}
