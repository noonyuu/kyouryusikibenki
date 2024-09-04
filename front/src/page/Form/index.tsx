import { BottomSheet } from "@/component/BottomSheet";
import { Header } from "@/component/Header";
import { TextArea } from "@/component/Parts/TextArea";
import { WordListHook } from "@/hook/WordList";

export const Form = () => {
  const wordList = WordListHook();

  return (
    <>
      <Header wordList={wordList} />
      <TextArea
        onClick={function (): void {
          throw new Error("Function not implemented.");
        }}
        onChange={function (): void {
          throw new Error("Function not implemented.");
        }}
      />
      <BottomSheet />
    </>
  );
};
