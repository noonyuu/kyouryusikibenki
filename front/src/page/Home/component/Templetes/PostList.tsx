import useSWR from "swr";
import { PostCard } from "../Organism/PostCard";

type Word = {
  ID: string;
  Word: string;
  Day: string;
  DeleteAt: string;
};

const fetcher = (url: string) =>
  fetch(url, {
    method: "GET",
    headers: {
      key: import.meta.env.VITE_APP_KEY,
    },
  }).then((res) => res.json());

export const PostList = () => {
  const { data, error, isLoading } = useSWR<Word[]>(
    "https://benki.noonyuu.com/app/v1/word-list/all",
    fetcher,
  );

  if (error) return <div>エラーが発生しました</div>;
  if (isLoading) return <div>読み込み中...</div>;
  console.log(data?.length);
  return (
    <div>
      {data?.map((item: Word, index: number) => (
        <PostCard
          key={index}
          id={""}
          word={item.Word}
          day={item.Day}
          deleteAt={""}
        />
      ))}
    </div>
  );
};
