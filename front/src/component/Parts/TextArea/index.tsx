import { ChangeEvent, FC } from "react";

type TextAreaProps = {
  description: string;
  value: string;
  onClickHandle: () => void;
  onChangeHandle: (e: ChangeEvent<HTMLTextAreaElement>) => void;
};

export const TextArea: FC<TextAreaProps> = (props) => {
  return (
    <>
      <textarea
        wrap="hard"
        className="w-4/5 rounded-bl-3xl rounded-tl-xl rounded-tr-3xl border border-black bg-white px-4 py-3 text-black"
        placeholder={props.description}
        value={props.value}
        onChange={props.onChangeHandle}
        onClick={props.onClickHandle}
      />
    </>
  );
};
