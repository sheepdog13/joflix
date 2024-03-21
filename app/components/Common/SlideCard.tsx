import { motion } from "framer-motion";
import Info from "../Info/Info";
import { makeImagePath } from "../../utils/makeImgPath";
import { Movie } from "../../types/moive";
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

interface SliderCardProps {
  movie: Movie;
}

const boxVariants = {
  normal: {
    scale: 1,
  },
  hover: {
    scale: 1.5,
    y: -150,
    transition: {
      delay: 0.5,
      duaration: 0.3,
      type: "tween",
    },
  },
};

export default function SlideCard({ movie }: SliderCardProps) {
  const [mounted, setMounted] = useState<boolean>(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  const path = usePathname();
  const params = useSearchParams();
  const keyword = params.get("keyword");
  return (
    mounted && (
      <Link
        href={{
          pathname: `${path}`,
          query: keyword ? { keyword, id: movie.id } : { id: movie.id },
        }}
      >
        <motion.div
          className="w-full h-32 bg-cover bg-center origin-center hover:rounded-t-md first:origin-top-left last:origin-top-right"
          layoutId={movie.id + ""}
          style={{
            backgroundImage: `url(${makeImagePath(
              movie.backdrop_path || movie.poster_path
            )})`,
          }}
          variants={boxVariants}
          initial="normal"
          whileHover="hover"
          transition={{ type: "tween" }}
          key={movie.id}
        >
          <Info movie={movie} />
        </motion.div>
      </Link>
    )
  );
}
