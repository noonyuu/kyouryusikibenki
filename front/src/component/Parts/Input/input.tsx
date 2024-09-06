import { FC } from "react";

interface InputProps {
  register?: any;
  type: "text" | "number";
}

export const Input: FC<InputProps> = (props) => {
  return (
    <input
      type={props.type}
      className="rounded-md border w-24"
      {...props.register}
    />
  );
};
