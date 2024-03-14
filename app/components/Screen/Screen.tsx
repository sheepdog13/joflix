import styles from "./screen.module.css";
import SvgIcon from "@mui/material/SvgIcon";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import ErrorOutlineOutlinedIcon from "@mui/icons-material/ErrorOutlineOutlined";
import Link from "next/link";
import { Movie } from "../../(Home)/page";

interface ScreenProps {
  movie: Movie;
}

export default function Screen({ movie }: ScreenProps) {
  const { backdrop_path, id, overview, title } = movie;

  return (
    <>
      <div
        className={styles.screen}
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3),rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)), url(${backdrop_path})`,
        }}
      >
        <h1>{title}</h1>
        <p>{overview}</p>
        <div className={styles.btnBox}>
          <div className={styles.play}>
            <SvgIcon component={PlayArrowIcon} />
            <button>재생</button>
          </div>
          <div>
            <SvgIcon component={ErrorOutlineOutlinedIcon} />
            <Link scroll={false} href={{ query: { id } }}>
              상세 정보
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
