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
  value: string;
  onChangeHandle: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  direction: Direction;
};

export const TextArea: FC<TextAreaProps> = ({
  description,
  value,
  onChangeHandle,
  direction,
}) => {
  return (
    <>
      <textarea
        wrap="hard"
        className={`w-4/5 resize-none ${direction.prepay} rounded-tl-xl rounded-tr-3xl border border-black bg-white px-4 py-3 text-black`}
        placeholder={description}
        value={value}
        onChange={onChangeHandle}
      />
    </>
  );
};
