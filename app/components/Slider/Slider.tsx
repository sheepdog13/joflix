"use client";
import { useState } from "react";
import styles from "./slider.module.css";
import { motion, AnimatePresence } from "framer-motion";
import { Movie } from "../../(Home)/page";
import Link from "next/link";

interface SliderProps {
  movies: Movie[];
}

const rowVariants = {
  hidden: {
    x: typeof window !== "undefined" ? window.innerWidth + 5 : "",
  },
  visible: {
    x: 0,
  },
  exit: {
    x: typeof window !== "undefined" ? -window.innerWidth - 5 : "",
  },
};

const offset = 5;

export default function Slider({ movies }: SliderProps) {
  const [index, setIndex] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const incraseIndex = () => {
    if (movies) {
      if (leaving) return;
      toggleLeaving();
      const totalMovies = movies.length;
      const maxIndex = Math.ceil(totalMovies / offset) - 1;
      setIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
    }
  };
  const toggleLeaving = () => setLeaving((prev) => !prev);
  return (
    <div className={styles.wrapper}>
      <h2>지금 뜨는 콘텐츠</h2>
      <div className={styles.slider}>
        <AnimatePresence initial={false} onExitComplete={toggleLeaving}>
          <motion.div
            className={styles.row}
            variants={rowVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ type: "tween", duration: 1 }}
            key={index}
          >
            <span className={styles.pre}>
              <div onClick={incraseIndex}>-</div>
            </span>
            {movies
              .slice(offset * index, offset * index + offset)
              .map((movie) => (
                <motion.div
                  className={styles.box}
                  key={movie.id}
                  style={{ backgroundImage: `url(${movie.backdrop_path})` }}
                />
              ))}
            <span className={styles.next}>
              <div onClick={incraseIndex}>+</div>
            </span>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
