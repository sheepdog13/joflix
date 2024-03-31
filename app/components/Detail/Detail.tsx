"use client";
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
import { Credits, getCredits } from "../../api/movie/getCredits";
import { motion } from "framer-motion";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { DetailMovie } from "../../types/detailMoive";
import { Movie } from "../../types/moive";

export default function Detail({ id }: { id: string }) {
  const path = usePathname();
  const params = useSearchParams();
  const keyword = params.get("keyword");
  const [movie, setMovie] = useState<DetailMovie>();
  const [credit, setCredit] = useState<Credits[]>();
  const [similars, setsimilars] = useState<Movie[]>();

  useEffect(() => {
    getMovie(id).then((data) => setMovie(data));
    getCredits(id).then((data) => setCredit(data));
    getSimilars(id).then((data) => setsimilars(data));
  }, [id]);

  return (
    movie && (
      <article>
        <div className={styles.overlay}>
          <motion.div
            layoutId={movie.id + ""}
            transition={{ type: false }}
            className={styles.wrapper}
          >
            <div
              className={styles.coverBox}
              style={{
                backgroundImage: `linear-gradient(rgba(0, 0, 0, 0), rgba(20, 20, 20, 1)), url(${makeImagePath(
                  movie.backdrop_path
                )})`,
              }}
            >
              <Link
                className={styles.close}
                href={{
                  pathname: `${path}`,
                  query: keyword ? { keyword } : {},
                }}
                scroll={false}
              >
                <SvgIcon component={CloseIcon} />
              </Link>
              <div className="mb-14 ml-5 sm:mb-24 sm:ml-0">
                <h1>{movie.title}</h1>
                <div className={styles.btnBox}>
                  <div className="flex items-center p-1.5 gap-0.5 rounded-md bg-white text-black font-medium hover:bg-white/80 sm:px-3 sm:py-2 sm:gap-1">
                    <SvgIcon
                      className=" text-2xl sm:text-3xl"
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
                  <div className="text-white line-clamp-6 sm:line-clamp-none">
                    {movie.overview}
                  </div>
                </div>
                <div className={styles.rightBox}>
                  <div>
                    <span>출연: </span>
                    {credit &&
                      credit
                        .filter((_, i) => i < 3)
                        .map((actor, i) => (
                          <Link
                            href={"/"}
                            key={actor.id}
                            style={{ color: "#fff" }}
                          >
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
              <div className="text-white">
                <p className="text-lg sm:text-2xl mb-4">함께 시청된 콘텐츠</p>
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                  {similars &&
                    similars.slice(0, 9).map((similar) => (
                      <Link href={{ query: { id: similar.id } }}>
                        <Card
                          key={similar.id}
                          movie={movie}
                          similar={similar}
                        />
                      </Link>
                    ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </article>
    )
  );
}
