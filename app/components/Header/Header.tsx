"use client";
import styles from "./home.module.css";
import {
  motion,
  useAnimation,
  useMotionValueEvent,
  useScroll,
} from "framer-motion";
import SvgIcon from "@mui/material/SvgIcon";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsIcon from "@mui/icons-material/Notifications";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { usePathname } from "next/navigation";
import { useState } from "react";

const navVariants = {
  top: {
    backgroundColor: "rgba(0, 0, 0, 0)",
  },
  scroll: {
    backgroundColor: "#121212",
  },
};

export default function Header() {
  const path = usePathname();
  const [searchOpen, setSearchOpen] = useState(false);
  const toggleSearch = () => setSearchOpen((prev) => !prev);
  const navAnimation = useAnimation();
  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", () => {
    if (scrollY.get() > 80) {
      navAnimation.start("scroll");
    } else {
      navAnimation.start("top");
    }
  });
  return (
    <motion.div
      variants={navVariants}
      animate={navAnimation}
      className={styles.wrapper}
    >
      <div className={styles.logoAndMenu}>
        <img src="./img/logo.png" alt="logo" />
        <ul>
          <li key="home" className={path === "/" ? styles.current : ""}>
            홈
          </li>
          <li key="series" className={path === "/series" ? styles.current : ""}>
            시리즈
          </li>
          <li key="movies" className={path === "/series" ? styles.current : ""}>
            영화
          </li>
          <li key="new_contents">NEW! 요즘 대세 콘텐츠</li>
          <li key="my_list">내가 찜한 리스트</li>
          <li key="language_options">언어별로 찾아보기</li>
        </ul>
      </div>
      <div className={styles.userActionsContainer}>
        <motion.div
          animate={{ x: searchOpen ? -280 : 0 }}
          transition={{ type: "linear" }}
        >
          <SvgIcon onClick={toggleSearch} component={SearchIcon} />
          {searchOpen && (
            <motion.input
              placeholder="제목,사람,장르"
              animate={{ scaleX: searchOpen ? 1 : 0 }}
              transition={{ type: "linear" }}
            />
          )}
        </motion.div>
        <SvgIcon component={NotificationsIcon} />
        <div>
          <img src="./img/bond.webp" alt="profile" />
          <SvgIcon component={ArrowDropDownIcon} fontSize="small" />
        </div>
      </div>
    </motion.div>
  );
}
