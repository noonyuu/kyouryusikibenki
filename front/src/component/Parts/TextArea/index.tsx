import { ChangeEvent, FC } from "react";

// 左方向の定義
export type Left = {
  direction: "left";
  prepay: string;
};

// 右方向の定義
export type Right = {
  direction: "right";
  prepay: string;
};

// カスタムUnion型
type Direction = Left | Right;

type TextAreaProps = {
  description: string;
  direction: Direction;
  register?: any;
};

export const TextArea: FC<TextAreaProps> = ({
  description,
  // value,
  // onChangeHandle,
  direction,
  register,
}) => {
  return (
    <>
      <textarea
        wrap="hard"
        className={`w-[80%] resize-none ${direction.prepay} rounded-tl-3xl rounded-tr-3xl border border-black bg-white px-4 py-3 text-black`}
        placeholder={description}
        {...register}
      />
    </>
  );
};
