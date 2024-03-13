import styles from "./detail.module.css";
import SvgIcon from "@mui/material/SvgIcon";
import CloseIcon from "@mui/icons-material/Close";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import Link from "next/link";
import Card from "../Card/Card";
import FavoriteButton from "../common/FavoriteButton";

export interface Movie {
  backdrop_path: string;
  title: string;
  release_date: string;
  runtime: string;
  overview: string;
  genres: { id: number; name: string }[];
}

export interface Similar {
  backdrop_path: string | null;
  id: number;
  original_title: string;
  overview: string;
  poster_path: string | null;
  release_date: string;
}

const getMovie = async (id: string) => {
  const response = await fetch(
    `https://nomad-movies.nomadcoders.workers.dev/movies/${id}`
  );
  return response.json();
};
const getcredits = async (id: string) => {
  const response = await fetch(
    `https://nomad-movies.nomadcoders.workers.dev/movies/${id}/credits`
  );
  return response.json();
};

const getsimilars = async (id: string) => {
  const response = await fetch(
    `https://nomad-movies.nomadcoders.workers.dev/movies/${id}/similar`
  );
  return response.json();
};

export default async function Detail({ id }: { id: string }) {
  const movie: Movie = await getMovie(id);
  const credit = await getcredits(id);
  const similars: Similar[] = await getsimilars(id);
  return (
    <>
      <div className={styles.overlay}>
        <div className={styles.wrapper}>
          <div
            className={styles.coverBox}
            style={{
              backgroundImage: `linear-gradient(rgba(0, 0, 0, 0), rgba(20, 20, 20, 1)), url(${movie.backdrop_path})`,
            }}
          >
            <Link href="/" className={styles.close}>
              <SvgIcon component={CloseIcon} />
            </Link>
            <div style={{ marginBottom: "100px" }}>
              <h1>{movie.title}</h1>
              <div className={styles.btnBox}>
                <div className={styles.play}>
                  <SvgIcon component={PlayArrowIcon} />
                  <button>재생</button>
                </div>
                <FavoriteButton />
                <div className={styles.radius}>
                  <SvgIcon component={ThumbUpOffAltIcon} />
                </div>
              </div>
            </div>
          </div>
          <div className={styles.content}>
            <div className={styles.descBox}>
              <div className={styles.leftBox}>
                <div>
                  <div>{movie.release_date}</div>
                  <div>{movie.runtime} 분</div>
                </div>
                <div style={{ color: "white" }}>{movie.overview}</div>
              </div>
              <div className={styles.rightBox}>
                <div>
                  <span>출연: </span>
                  {credit
                    .filter((_, i) => i < 3)
                    .map((actor, i) => (
                      <Link href={"/"} key={actor.id} style={{ color: "#fff" }}>
                        {actor.name}
                        {i < 3 && ", "}
                      </Link>
                    ))}
                </div>
                <div>
                  <span>장르: </span>
                  {movie.genres.map((genre, i) => (
                    <Link href={"/"} key={genre.id} style={{ color: "#fff" }}>
                      {genre.name}
                      {i < movie.genres.length - 1 && ", "}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
            <div className={styles.similarBox}>
              <h2>함께 시청된 콘텐츠</h2>
              <div className={styles.similarGrid}>
                {similars.map((similar) => (
                  <Link href={{ query: { id: similar.id } }}>
                    <Card key={similar.id} movie={movie} similar={similar} />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
