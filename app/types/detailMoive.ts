export interface Genre {
  id: number;
  name: string;
}

export interface DetailMovie {
  id: number;
  backdrop_path: string;
  poster_path: string;
  title: string;
  release_date: string;
  runtime: string;
  overview: string;
  genres: Genre[];
}
