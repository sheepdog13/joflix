const getMovieInfo = async (id: string) => {
  const response = await fetch(
    `https://nomad-movies.nomadcoders.workers.dev/movies/${id}`
  );
  return response.json();
};

export default async function MovieInfo({ id }: { id: string }) {
  const movie = await getMovieInfo(id);
  return <div>{JSON.stringify(movie)}</div>;
}
