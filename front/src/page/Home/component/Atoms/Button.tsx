import { FC } from "react";

type ButtonProps = {
  text: string;
  bgColor: string;
  textColor: string;
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
      className={`bg-${bgColor} text-${textColor} h-10 w-20 rounded-full px-4 py-2`}
      onClick={onSubmit}
    >
      {text}
    </button>
  );
};
