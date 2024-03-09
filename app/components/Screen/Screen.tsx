import styles from "./screen.module.css";

interface ScreenProps {
  backdrop_path: string;
  id: number;
  overview: string;
  title: string;
}

export default function Screen(props: ScreenProps) {
  const { backdrop_path, id, overview, title } = props;
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
          <button>재생</button>
          <button>상세 정보</button>
        </div>
      </div>
    </>
  );
}
