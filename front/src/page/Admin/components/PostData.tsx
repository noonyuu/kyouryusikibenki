import { Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Cards } from "./Cards";

// データ型の定義
type PoopData = {
  ID: string;
  Word: string;
  Day: string;
  DeleteAt: string;
};

export const PostData = () => {
  // useStateに型を指定（初期値は空配列）
  const [poopData, setPoopData] = useState<PoopData[]>([]);

  useEffect(() => {
    /* 第1引数には実行させたい副作用関数を記述*/
    GetPoopjson();
  }, []);

  // jsondata取得
  const GetPoopjson = () => {
    fetch("https://benki.noonyuu.com/app/v1/word-list/all")
      .then((response) => response.json())
      .then((data: PoopData[]) => {
        setPoopData(data); // データを状態にセット
        console.log(data); // データを確認用にコンソールに出力
      })
      .catch((error) => {
        console.error("エラーが発生:", error);
      });
  };

  // const handleClick = () => {
  //   GetPoopjson();
  // };

  return (
    <div>
      {/* <Button onClick={handleClick}>Click me!</Button>
      データが存在する場合にリストを表示 */}
      {poopData.length > 0 && (
        <Grid container spacing={2}>
          {poopData.map((item) => (
            <Grid item key={item.ID} xs={12} md={4} lg={3}>
              <Cards
                Word={item.Word}
                Day={item.Day}
                DeleteAt={item.DeleteAt}
                ID={item.ID}
              />
            </Grid>
          ))}
        </Grid>
      )}
    </div>
  );
};
