import { SvgIconComponent } from "@mui/icons-material";
import SvgIcon from "@mui/material/SvgIcon";

interface ButtonProps {
  width: string;
  fontsize: string;
  component: SvgIconComponent;
  border?: boolean;
  bgColor?: string;
  color?: string;
}

export default function Button({
  width,
  fontsize,
  component,
  border = true,
  bgColor = "black/[.1]",
  color = "white",
}: ButtonProps) {
  return (
    <>
      <div
        style={{
          width: `${width}px`,
          height: `${width}px`,
        }}
        className={`flex justify-center items-center bg-${bgColor} text-${color} rounded-full ${
          border ? "border-2" : `border`
        }  border-solid  border-white/[.7] ${
          bgColor === "white" ? "hover:bg-white/90" : "hover:border-white"
        }  `}
      >
        <SvgIcon style={{ fontSize: `${fontsize}px` }} component={component} />
      </div>
    </>
  );
}
