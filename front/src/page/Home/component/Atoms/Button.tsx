import { FC } from "react";

const backColor = {
  lightBlue: "bg-lightBlue",
};
const color = {
  white: "text-white",
  black: "text-black",
};

type ButtonProps = {
  text: string;
  bgColor: "lightBlue";
  textColor: "white" | "black";
  onSubmit?: () => void;
};

export const Button: FC<ButtonProps> = ({
  text,
  bgColor,
  textColor,
  onSubmit,
}) => {
  return (
    <button
      className={`${backColor[bgColor]} ${color[textColor]} h-10 w-20 rounded-full px-4 py-2`}
      onClick={onSubmit}
    >
      {text}
    </button>
  );
};
