import { BottomSheet } from "@/component/BottomSheet";
import { Header } from "@/component/Header";
import RandomText from "@/component/RandomText";
import React from "react";

export const Home: React.FC = () => {
  const texts = ["Hello", "World", "Random", "Text", "React", "TypeScript"];
  return (
    <>
      <Header />
      <main className="relative h-[calc(100vh_-_64px_-_64px)] w-screen">
        {texts.map((text, index) => (
          <RandomText key={index} text={text} />
        ))}
      </main>
      <BottomSheet />
    </>
  );
};
