import SvgIcon from "@mui/material/SvgIcon";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import ErrorOutlineOutlinedIcon from "@mui/icons-material/ErrorOutlineOutlined";
import Link from "next/link";
import { DetailMovie } from "../../types/detailMoive";
import { makeImagePath } from "../../utils/makeImgPath";

interface ScreenProps {
  movie: DetailMovie;
}

export default function Screen({ movie }: ScreenProps) {
  const { backdrop_path, poster_path, id, overview, title } = movie;
  return (
    <section className="bg-fixed">
      <div
        className="relative h-screen p-10 flex flex-col justify-center bg-cover bg-center text-white sm:h-screen sm:p-16"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)), url(${makeImagePath(
            poster_path
          )})`,
        }}
      >
        <h1 className="text-3xl w-4/5 font-Cart font-bold sm:text-6xl sm:w-full sm:my-4">
          {title}
        </h1>
        <p className="hidden w-1/2 sm:line-clamp-4 font-medium text-base leading-normal">
          {overview}
        </p>
        <div className="flex flex-row mt-2 gap-2 sm:mt-4">
          <div className="flex items-center text-base p-2 gap-1 rounded-md bg-white text-black hover:bg-white/[.8] sm:text-lg sm:px-4 sm:py-2">
            <SvgIcon
              className="text-xl sm:text-3xl"
              component={PlayArrowIcon}
            />
            <button>재생</button>
          </div>
          <div className="flex items-center text-base p-2 gap-1 rounded-md bg-gray-500/[.7] text-white hover:bg-gray-500/[.5] sm:text-lg sm:px-4 sm:py-2">
            <SvgIcon
              className="text-xl sm:text-3xl"
              component={ErrorOutlineOutlinedIcon}
            />
            <Link scroll={false} href={{ query: { id } }}>
              상세 정보
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
