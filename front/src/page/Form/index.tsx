import { BottomSheet } from "@/component/BottomSheet";
import { Header } from "@/component/Header";
import { WordListHook } from "@/hook/WordList";

export const Form = () => {
  
  const wordList = WordListHook();

  return (
    <>
      <Header wordList={wordList} />

      <BottomSheet />
    </>
  );
};
