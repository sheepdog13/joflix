"use client";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { getSearchMovies } from "../api/search/getSearchMovies";
import SlideCard from "../components/Common/SlideCard";
import Detail from "../components/Detail/Detail";

export default async function search(params: Params) {
  const movies = await getSearchMovies(params.searchParams.keyword);
  const id = params.searchParams.id;

  return (
    <div className="my-24">
      <h1 className="my-14 text-center text-5xl text-white">
        {params.searchParams.keyword}
      </h1>
      <div className="grid grid-cols-4 gap-y-14 gap-2 text-white [&>*:nth-child(4n)]:origin-top-right [&>*:nth-child(4n+1)]:origin-top-left">
        {movies.map((movie) => (
          <SlideCard movie={movie} />
        ))}
      </div>
      {id && (
        <>
          <Detail id={id} />
        </>
      )}
    </div>
  );
}
