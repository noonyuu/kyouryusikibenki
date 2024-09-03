import { useEffect, useState, useMemo } from "react";

export const WordListHook = () => {
  const [isFirstRender, setIsFirstRender] = useState(false);
  const [fetchedWordList, setFetchedWordList] = useState<string[]>([]);

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

  return wordList;
};
