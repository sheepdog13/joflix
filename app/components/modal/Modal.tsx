import styles from "./modal.module.css";
import SvgIcon from "@mui/material/SvgIcon";
import CloseIcon from "@mui/icons-material/Close";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import AddIcon from "@mui/icons-material/Add";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import Link from "next/link";
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

export default async function Modal({ id }: { id: string }) {
  const movie = await getMovie(id);
  const credit = await getcredits(id);
  const similars = await getsimilars(id);
  return (
    <>
      <div className={styles.overlay}>
        <div className={styles.modal}>
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
                <div className={styles.radius}>
                  <SvgIcon component={AddIcon} />
                </div>
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
                  <div key={similar.id} className={styles.card}>
                    <div
                      className={styles.cardImg}
                      style={{ backgroundImage: `url(${similar.poster_path})` }}
                    ></div>
                    <h3>{similar.original_title}</h3>
                    <div className={styles.cardDesc}>
                      <div>{movie.release_date}</div>
                      <div>{movie.runtime} 분</div>
                    </div>
                    <div className={styles.cardContent}>
                      <div className={styles.longText}>{similar.overview}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
