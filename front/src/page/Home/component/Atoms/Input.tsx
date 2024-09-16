import { FC } from "react";
import "../../style/index.css";

type InputProps = {
  placeholder: string;
};

export const Input: FC<InputProps> = ({ placeholder }) => {
  return (
    <textarea
      placeholder={placeholder}
      className="w-full resize-none focus:outline-none"
      rows={1}
    />
  );
};
