import { BottomSheet } from "@/component/BottomSheet";
import { Header } from "@/component/Header";
import React, { useEffect, useMemo } from "react";
import ThreeScene from "@/animation/ThreeScene";

export const Home: React.FC = () => {
  const [isFirstRender, setIsFirstRender] = React.useState(false);
  const [fetchedWordList, setFetchedWordList] = React.useState<string[]>([]);

  useEffect(() => {
    if (isFirstRender) {
      return;
    }

    fetch("https://benki.noonyuu.com/app/v1/word-list", {
      method: "GET",
      headers: {
        key: import.meta.env.VITE_APP_KEY,
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json();
      })
      .then((data) => {
        const words = data.map((item: { Word: string }) => item.Word);
        setFetchedWordList(words);
        console.log("wordList", words);
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });
    setIsFirstRender(true);
  }, [isFirstRender]);

  const wordList = useMemo(() => fetchedWordList, [fetchedWordList]);

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
