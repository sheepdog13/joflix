import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { Suspense } from "react";
import MovieInfo from "../../components/MovieInfo";
import MovieVideo from "../../components/MovieVideo";

export default async function movie({
  params: { id },
}: {
  params: { id: string };
}) {
  return (
    <div>
      <Suspense fallback={<h1>loading</h1>}>
        <MovieInfo id={id} />
      </Suspense>
      <Suspense fallback={<h1>loading</h1>}>
        <MovieVideo id={id} />
      </Suspense>
    </div>
  );
}
