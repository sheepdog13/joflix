export const getMovies = async () => {
  const response = await fetch(
    "https://nomad-movies.nomadcoders.workers.dev/movies"
  );
  return response.json();
};
