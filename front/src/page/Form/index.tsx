import { BottomSheet } from "@/component/BottomSheet";
import { Header } from "@/component/Header";
import { TextArea } from "@/component/Parts/TextArea";
import { WordListHook } from "@/hook/WordList";
import { ChangeEvent, useState } from "react";

export const Form = () => {
  const wordList = WordListHook();
  const [inputValue, setInputValue] = useState<string>("");

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
