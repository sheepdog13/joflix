export const getMovie = async (id: number | string) => {
  const response = await fetch(
    `https://nomad-movies.nomadcoders.workers.dev/movies/${id}`
  );
  return response.json();
};
