import { FC, useState } from "react";

interface Props {
  onChange: (tab: number) => void | (() => void);
}

// TODO: ここはちゃんとpropsを受け取るようにする
const contents = [
  { title: "流れたうんこ"},
  { title: "溜まってるうんこ"},
];

export const Tab: FC<Props> = ({ onChange }) => {
  const [tab, setTab] = useState<number>(0);
  return (
    <div className="flex h-16 w-sm">
      {contents.map((content, index) => (
        <div
          key={index}
          onClick={() => {
            setTab(index);
            onChange(index);
          }}
          className={`${index === tab ? "text-white border-b-2 border-blue-500" : "text-gray-400"} w-1/2 items-center flex justify-center`}
        >
          {content.title}
        </div>
      ))}
    </div>
  );
};
