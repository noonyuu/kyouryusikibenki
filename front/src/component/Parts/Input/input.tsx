import { FC } from "react";

interface InputProps {
  register?: any;
  type: "text" | "number";
}

export const Input: FC<InputProps> = (props) => {
  return (
    <input
      type={props.type}
      className="rounded-md border w-16"
      {...props.register}
    />
  );
};
