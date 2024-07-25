import { BottomSheet } from "@/component/BottomSheet";
import { Header } from "@/component/Header";
import RandomText from "@/component/RandomText";
import React, { useEffect } from "react";

export const Home: React.FC = () => {
  const [wordList, setWordList] = React.useState<string[]>([]);
  const [isFirstRender, setIsFirstRender] = React.useState(false);

  useEffect(() => {
    if (isFirstRender) {
      return;
    }
    fetch("https://localhost:8443/app/v1/word-list")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json();
      })
      .then((data) => {
        const words = data.map((item: { Word: string }) => item.Word);
        setWordList(words);
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });
    setIsFirstRender(true);
  }, [isFirstRender]);

  return (
    <>
      <Header />
      <main className="relative h-[calc(100vh_-_64px_-_64px)] w-screen">
        {wordList.map((text, index) => (
          <RandomText key={index} text={text} />
        ))}
      </main>
      <BottomSheet />
    </>
  );
};
