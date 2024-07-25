import React from "react";
import { getRandomPosition } from "@/common/utils";

interface TextProps {
  text: string;
}

const RandomText: React.FC<TextProps> = ({ text }) => {
  const { x, y } = getRandomPosition(
    window.innerWidth - 64 - 64,
    window.innerHeight - 64 - 64 - 24,
  );

  const fontSize = Math.floor(Math.random() * 10) + 20;
  const color = `rgb(${Math.floor(Math.random() * 255)}, ${Math.floor(
    Math.random() * 255,
  )}, ${Math.floor(Math.random() * 255)})`;

  const style = {
    position: "absolute" as "absolute",
    left: `${x}px`,
    top: `${y}px`,
    transform: "translate(-50%, -50%)",
    fontSize: `${fontSize}px`,
    color: color,
  };

  return <div style={style}>{text}</div>;
};

export default RandomText;
