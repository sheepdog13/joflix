import Button from "../Common/Button";
import AddIcon from "@mui/icons-material/Add";

import { Movie, Similar } from "../Detail/Detail";
import styles from "./card.module.css";

interface CardProps {
  movie: Movie;
  similar: Similar;
}

export default function Card({ movie, similar }: CardProps) {
  const { id, backdrop_path, original_title, release_date, overview } = similar;
  const { runtime } = movie;

  return (
    <>
      <div key={id} className={styles.wrapper}>
        <div
          className={styles.cover}
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.5)), url(${backdrop_path})`,
          }}
        >
          {!backdrop_path && "이미지가 없습니다."}
          <h3>{original_title}</h3>
        </div>
        <div className={styles.descBox}>
          <div className={styles.desc}>
            <div>{release_date}</div>
            <div>{runtime} 분</div>
          </div>
          <Button width="40" fontsize="30" component={AddIcon} />
        </div>
        <div className={styles.ContentBox}>
          <div className="line-clamp-6">{overview}</div>
        </div>
      </div>
    </>
  );
}
