import { convertDateTime } from "@/common/time";
import { Icon } from "../Atoms/Icon";
import { FC, useState } from "react";

type PostCardProps = {
  id: string;
  word: string;
  day: string;
  deleteAt: string;
};

export const PostCard: FC<PostCardProps> = ({ id, word, day, deleteAt }) => {
  const [isPoop, setIsPoop] = useState(false);
  const [isHeart, setIsHeart] = useState(false);
  return (
    <div className="w-sm min-h-sm box-border flex flex-col border-t-[0.5px] border-white bg-slate-950">
      <div className="flex w-full pl-4 pt-2">
        <Icon iconPath="preview.jpeg" rounded={true} />
        <div className="grow pr-2 text-end text-xs text-white">
          {convertDateTime(day)}
        </div>
      </div>
      <div className="flex w-full pl-4 pt-2 text-sm text-white">{word}</div>
      <div className="flex w-full justify-end space-x-4 pl-4 pt-2">
        <div className="flex w-20 space-x-2">
          <button type="button" onClick={() => setIsPoop(!isPoop)}>
            <img
              src={`${isPoop ? "poop-true.svg" : "poop.svg"}`}
              alt="うんこ"
            />
          </button>
          <div className="text-white">4,294</div>
        </div>
        <div className="flex w-20 space-x-2">
          <button type="button" onClick={() => setIsHeart(!isHeart)}>
            <img
              src={`${isHeart ? "heart-true.svg" : "heart.svg"}`}
              alt="いいね"
            />
          </button>
          <div className="text-white">4万</div>
        </div>
      </div>
    </div>
  );
};
