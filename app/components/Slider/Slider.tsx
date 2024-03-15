"use client";
import { useState } from "react";
import styles from "./slider.module.css";
import { motion, AnimatePresence } from "framer-motion";
import { Movie } from "../../(Home)/page";
import SvgIcon from "@mui/material/SvgIcon";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import Link from "next/link";

interface SliderProps {
  movies: Movie[];
}

const rowVariants = {
  hidden: (isDirectionBack: boolean) => ({
    x:
      typeof window !== "undefined"
        ? isDirectionBack
          ? window.innerWidth + 5
          : -window.innerWidth - 5
        : "",
  }),
  visible: {
    x: 0,
  },
  exit: (isDirectionBack: boolean) => ({
    x:
      typeof window !== "undefined"
        ? isDirectionBack
          ? -window.innerWidth - 5
          : +window.innerWidth + 5
        : "",
  }),
};

const offset = 5;

export default function Slider({ movies }: SliderProps) {
  const [index, setIndex] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const [isDirectionBack, setIsDirectionBack] = useState(false);

  const totalMovies = movies.length;
  const maxIndex = Math.ceil(totalMovies / offset) - 1;

  const incraseIndex = () => {
    if (movies) {
      if (leaving) return;
      toggleLeaving();
      setIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
      setIsDirectionBack(true);
    }
  };
  const decraseIndex = () => {
    if (movies) {
      if (leaving) return;
      toggleLeaving();
      setIsDirectionBack(false);
      setIndex((prev) => (prev === 0 ? maxIndex : prev - 1));
    }
  };
  const toggleLeaving = () => setLeaving((prev) => !prev);
  return (
    <div className={styles.wrapper}>
      <h2 className="text-lg text-white ml-11 my-3">지금 뜨는 콘텐츠</h2>
      <div className={styles.slider}>
        <span onClick={decraseIndex} className={styles.pre}>
          <div>
            <SvgIcon fontSize="large" component={ArrowBackIosNewIcon} />
          </div>
        </span>
        <AnimatePresence
          initial={false}
          onExitComplete={toggleLeaving}
          custom={isDirectionBack}
        >
          <motion.div
            className={styles.row}
            variants={rowVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            custom={isDirectionBack}
            transition={{ type: "tween", duration: 1 }}
            key={index}
          >
            {movies
              .slice(offset * index, offset * index + offset)
              .map((movie) => (
                <motion.div
                  className={styles.box}
                  key={movie.id}
                  style={{ backgroundImage: `url(${movie.backdrop_path})` }}
                />
              ))}
          </motion.div>
        </AnimatePresence>
        <span onClick={incraseIndex} className={styles.next}>
          <div>
            <SvgIcon fontSize="large" component={ArrowForwardIosIcon} />
          </div>
        </span>
      </div>
    </div>
  );
}
