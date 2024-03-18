import styles from "./detail.module.css";
import SvgIcon from "@mui/material/SvgIcon";
import CloseIcon from "@mui/icons-material/Close";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import AddIcon from "@mui/icons-material/Add";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import Link from "next/link";
import Card from "../Card/Card";
import { getSimilars } from "../../api/movie/getSimilars";
import { getMovie } from "../../api/movie/getMoive";
import Button from "../Common/Button";
import { makeImagePath } from "../../utils/makeImgPath";
import { getCredits } from "../../api/movie/getCredits";

export default async function Detail({ id }: { id: string }) {
  const movie = await getMovie(id);
  const credit = await getCredits(id);
  const similars = await getSimilars(id);
  return (
    <>
      <div className={styles.overlay}>
        <div className={styles.wrapper}>
          <div
            className={styles.coverBox}
            style={{
              backgroundImage: `linear-gradient(rgba(0, 0, 0, 0), rgba(20, 20, 20, 1)), url(${makeImagePath(
                movie.backdrop_path
              )})`,
            }}
          >
            <Link href="/" className={styles.close}>
              <SvgIcon component={CloseIcon} />
            </Link>
            <div style={{ marginBottom: "100px" }}>
              <h1>{movie.title}</h1>
              <div className={styles.btnBox}>
                <div className="flex items-center px-3 py-2 gap-1 rounded-md bg-white text-black font-medium hover:bg-white/80">
                  <SvgIcon
                    style={{ fontSize: "30px" }}
                    component={PlayArrowIcon}
                  />
                  <button>재생</button>
                </div>
                <Button width="45" fontsize="30" component={AddIcon} />
                <Button
                  width="45"
                  fontsize="24"
                  component={ThumbUpOffAltIcon}
                />
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
                {similars.slice(0, 9).map((similar) => (
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
