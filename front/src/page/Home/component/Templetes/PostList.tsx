import useSWR from "swr";
import { PostCard } from "../Organism/PostCard";
import { FC, useEffect } from "react";
import styles from "../../turnAnimation.module.css";
import { loopAnimation } from "@/common/reload";

type Word = {
  ID: string;
  Word: string;
  Day: string;
  DeleteAt: string;
};

type PostListProps = {
  path?: string;
};

const fetcher = (url: string) =>
  fetch(url, {
    method: "GET",
    headers: {
      key: import.meta.env.VITE_APP_KEY,
    },
  }).then((res) => res.json());

const url = "https://benki.noonyuu.com/app/v1/word-list";

export const PostList: FC<PostListProps> = ({ path }) => {
  console.log(path);
  const customPath = path ? url + path : url;

  const { data, error, isLoading } = useSWR<Word[]>(customPath, fetcher);

  useEffect(() => {
    loopAnimation("logo", styles.target, 2000);
  }, []);

  if (error) return <div>エラーが発生しました</div>;
  if (isLoading)
    return (
      <div className="text-center text-white">
        <img
          id="logo"
          className={`${styles.target} mx-auto mt-24 size-60`}
          src={"unk.svg"}
          alt="unko"
        />
        ...読み込み中
      </div>
    );
  console.log(data?.length);
  return (
    <>
      {data?.map((item: Word, index: number) => (
        <PostCard
          key={index}
          id={""}
          word={item.Word}
          day={item.Day}
          deleteAt={""}
        />
      ))}
    </>
  );
};
