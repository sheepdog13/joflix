import Button from '../Common/Button';
import AddIcon from '@mui/icons-material/Add';
import styles from './card.module.css';
import { DetailMovie } from '../../types/detailMoive';
import { Movie } from '../../types/moive';
import { makeImagePath } from '../../utils/makeImgPath';

interface CardProps {
  movie: DetailMovie;
  similar: Movie;
}

export default function Card({ movie, similar }: CardProps) {
  const { id, backdrop_path, title, release_date, overview } = similar;
  const { runtime, poster_path } = movie;

  return (
    <>
      <div key={id} className={styles.wrapper}>
        <div
          className={styles.cover}
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.5)), url(${makeImagePath(backdrop_path || poster_path)})`,
          }}
        >
          <p className="text-sm text-center font-bold sm:text-xl">{title}</p>
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
