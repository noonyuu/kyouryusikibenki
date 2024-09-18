import { FC } from "react";
import "../../style/index.css";

type TextareaProps = {
  placeholder: string;
} & React.TextareaHTMLAttributes<HTMLTextAreaElement>;

export const Textarea: FC<TextareaProps> = ({ placeholder, ...props }) => {
  return (
    <textarea
      placeholder={placeholder}
      className="w-full resize-none focus:outline-none"
      rows={1}
      {...props}
    />
  );
};
