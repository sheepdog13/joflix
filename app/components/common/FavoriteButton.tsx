import styles from "./favorite.module.css";
import SvgIcon from "@mui/material/SvgIcon";
import AddIcon from "@mui/icons-material/Add";

export default function FavoriteButton() {
  return (
    <>
      <div className={styles.radius}>
        <SvgIcon component={AddIcon} />
      </div>
    </>
  );
}
