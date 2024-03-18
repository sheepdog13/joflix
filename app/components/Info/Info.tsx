"use client";
import { motion } from "framer-motion";
import Button from "../Common/Button";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import AddIcon from "@mui/icons-material/Add";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getMovie } from "../../api/movie/getMoive";
import { Movie } from "../../types/moive";
import { Genre } from "../../types/detailMoive";

interface InfoProps {
  movie: Movie;
}

const infoVariants = {
  hover: {
    opacity: 1,
    transition: {
      delay: 0.5,
      duaration: 0.1,
      type: "tween",
    },
  },
};

export default function Info({ movie }: InfoProps) {
  const { id, title, release_date } = movie;
  const [genres, setGenres] = useState<Genre[]>();
  useEffect(() => {
    getMovie(id).then((data) => setGenres(data.genres));
  }, []);
  return (
    <>
      <motion.div
        className="opacity-0 absolute -bottom-28 flex flex-col gap-2 w-full p-3 bg-black rounded-b-lg"
        variants={infoVariants}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button
              width="25"
              fontsize="13"
              border={false}
              component={PlayArrowIcon}
              bgColor="white"
              color="black"
            />
            <Button
              width="25"
              fontsize="13"
              border={false}
              component={AddIcon}
            />
            <Button
              width="25"
              fontsize="13"
              border={false}
              component={ThumbUpOffAltIcon}
            />
          </div>
          <Link scroll={false} href={{ query: { id } }}>
            <Button
              width="25"
              fontsize="13"
              component={KeyboardArrowDownIcon}
              border={false}
            />
          </Link>
        </div>
        <div className="flex flex-col">
          <span className=" text-[10px] text-gray-500">{release_date}</span>
          <p className="text-xl">{title}</p>
        </div>
        <ul className="flex flex-row items-center px-3 gap-4 text-[10px]">
          {genres?.slice(0, 3).map((genre) => (
            <li
              className="text-white list-disc marker:text-gray-500"
              key={genre.id}
            >
              {genre.name}
            </li>
          ))}
        </ul>
      </motion.div>
    </>
  );
}
