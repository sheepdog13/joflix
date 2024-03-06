const getMovieVideo = async (id: string) => {
  const response = await fetch(
    `https://nomad-movies.nomadcoders.workers.dev/movies/${id}/videos`
  );
  return response.json();
};

export default async function MovieVideo({ id }: { id: string }) {
  const viedo = await getMovieVideo(id);
  return <div>{JSON.stringify(viedo)}</div>;
}
