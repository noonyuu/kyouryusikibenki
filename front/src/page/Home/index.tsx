import { BottomSheet } from "@/component/BottomSheet";
import { Header } from "@/component/Header";
import React, { useEffect, useMemo } from "react";
import ThreeScene from "@/animation/ThreeScene";
import { WordListHook } from "@/hook/WordList";

export const Home: React.FC = () => {
  
  const wordList = WordListHook();

  const textData = useMemo(() => {
    return wordList.map((word) => ({
      content: word,
    }));
  }, [wordList]);

  return (
    <>
      <Header wordList={wordList} />
      <ThreeScene textData={textData} />
      <BottomSheet />
    </>
  );
};
