export const getSimilars = async (id: string) => {
  const response = await fetch(
    `https://nomad-movies.nomadcoders.workers.dev/movies/${id}/similar`
  );
  return response.json();
};
