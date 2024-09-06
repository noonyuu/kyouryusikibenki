import { BottomSheet } from "@/component/BottomSheet";
import { Header } from "@/component/Header";
import { TextArea, Left, Right } from "@/component/Parts/TextArea";
import { WordListHook } from "@/hook/WordList";
import { ChangeEvent, useState } from "react";

export const Form = () => {
  const wordList = WordListHook();
  const [inputValue, setInputValue] = useState<string>("");

  // Left型のdirectionオブジェクト
  const leftDirection: Left = {
    direction: "left",
    prepay: "rounded-br-3xl",
  };

  // Right型のdirectionオブジェクト
  const rightDirection: Right = {
    direction: "right",
    prepay: "rounded-bl-3xl",
  };

  const onChangeHandle = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(e.target.value);
  };

  return (
    <>
      <Header wordList={wordList} />
      <TextArea
        onChangeHandle={onChangeHandle}
        description={"にゅうりょくしてな"}
        value={inputValue}
        direction={leftDirection}
      />
      <TextArea
        onChangeHandle={onChangeHandle}
        description={"にゅうりょくしてな"}
        value={inputValue}
        direction={rightDirection}
      />
      <button
        onClick={() => {
          console.log(inputValue);
        }}
      >
        ボタン
      </button>
      <BottomSheet />
    </>
  );
};
