export interface DetailMovie {
  id: number;
  backdrop_path: string;
  poster_path: string;
  title: string;
  release_date: string;
  runtime: string;
  overview: string;
  genres: { id: number; name: string }[];
}
