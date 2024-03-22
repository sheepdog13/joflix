import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { getSearchMovies } from "../api/search/getSearchMovies";
import SlideCard from "../components/Common/SlideCard";
import Detail from "../components/Detail/Detail";
import { Metadata } from "next";
import { makeImagePath } from "../utils/makeImgPath";
import { getMovie } from "../api/movie/getMoive";

export async function generateMetadata(params: Params): Promise<Metadata> {
  const keyword = params.searchParams.keyword;
  const id = params.searchParams.id;
  const movies = await getSearchMovies(params.searchParams.keyword);
  const keywordImg =
    movies.length > 0
      ? makeImagePath(movies[0].poster_path) ||
        makeImagePath(movies[0].backdrop_path)
      : "/img/bond.webp";
  const movie = await getMovie(id);
  const idImg = movie?.poster_path
    ? makeImagePath(movie.poster_path) || makeImagePath(movie.backdrop_path)
    : "/img/bond.webp";
  console.log(idImg);
  return {
    title: `${id ? movie.title : keyword}`,
    description: `${
      id ? movie.overview : movies[0].overview || "검색페이지 입니다."
    }`,
    openGraph: {
      images: `${id ? idImg : keywordImg}`,
    },
  };
}

export default async function Search(params: Params) {
  const movies = await getSearchMovies(params.searchParams.keyword);
  const id = params.searchParams.id;

  return (
    <>
      {movies.length ? (
        <div className="my-24">
          <h1 className="my-14 text-center text-5xl text-white">
            {params.searchParams.keyword}
          </h1>
          <div className="grid grid-cols-4 gap-y-14 gap-2 text-white [&>*:nth-child(4n)]:origin-top-right [&>*:nth-child(4n+1)]:origin-top-left">
            {movies.map((movie) => (
              <SlideCard key={movie.id} movie={movie} />
            ))}
          </div>
          {id && (
            <>
              <Detail id={id} />
            </>
          )}
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center text-white w-full h-screen">
          <h1 className="my-2 text-center text-2xl text-white">
            입력하신 '{params.searchParams.keyword}' (와)과
          </h1>
          <div className="text-2xl">일치하는 결과가 없습니다.</div>
        </div>
      )}
    </>
  );
}
