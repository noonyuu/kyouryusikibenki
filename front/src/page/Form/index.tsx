import { BottomSheet } from "@/component/BottomSheet";
import { Header } from "@/component/Header";
import { TextArea, Left, Right } from "@/component/Parts/TextArea";
import { WordListHook } from "@/hook/WordList";
import { ChangeEvent, useEffect, useState } from "react";
import { getPrefecture } from "@/common/location";
import { localStorage } from "@/common/localstrage";
import { Input } from "@/component/Parts/Input/input";
import { RfhSchema } from "@/schema/input/rfh.schema";
import { getJapanesePrefectureName } from "@/common/prefecture";
import { Prefecture } from "@/schema/input/zod.schema";

export const Form = () => {
  const wordList = WordListHook();
  const { register, errors, onSubmit, setValue } = RfhSchema();
  const [prefecture, setPrefecture] = useState<string | undefined>(undefined);

  const isPrefecture = (value: string): value is Prefecture => {
    return prefecture!.includes(value as Prefecture);
  };

  useEffect(() => {
    const userInfo = localStorage.getItem("prefecture");
    if (userInfo) {
      setValue("prefecture", userInfo as Prefecture);
    }
  }, [setValue]);

  useEffect(() => {
    // 非同期関数を定義し、呼び出す
    const fetchPrefecture = async () => {
      try {
        const prefecture = await getPrefecture();
        if (prefecture) {
          const japanesePrefecture = getJapanesePrefectureName(prefecture);
          localStorage.setItem("prefecture", japanesePrefecture);
          setValue("prefecture", japanesePrefecture as Prefecture);
        }
      } catch (error) {
        console.error("Error fetching prefecture:", error);
        setValue("prefecture", "");
      }
    };

    fetchPrefecture();
  }, [setValue]);

  // Left型のdirectionオブジェクト
  const leftDirection: Left = {
    direction: "left",
    prepay: "rounded-br-3xl",
  };

  // Right型のdirectionオブジェクト
  const rightDirection: Right = {
    direction: "right",
    prepay: "rounded-bl-3xl",
  };

  const handleButtonClick = async () => {
    try {
      const prefecture = await getPrefecture();
      if (!prefecture) {
        return;
      }
      localStorage.setItem("prefecture", prefecture);
    } catch (error) {
      console.error("Error fetching prefecture:", error);
    }
  };

  return (
    <>
      <Header wordList={wordList} />
      <main>
        <form
          onSubmit={onSubmit}
          className="flex w-full flex-col items-center space-y-2"
        >
          <div className="relative mt-4 flex max-w-[80%] items-center border p-4">
            <div className="absolute -left-4 -top-4 border bg-white">任意</div>

            <div>
              <p className="flex">
                <div className="w-16 text-center">年齢</div>
                <div className="w-32">
                  ：
                  <Input
                    register={register("age", { required: true })}
                    type="number"
                  />
                </div>
                <span className="text-red-200">{errors.age?.message}</span>
              </p>
              <p className="flex">
                <div className="w-16 text-center">都道府県</div>
                <div className="w-32">
                  ：
                  <input
                    {...register("prefecture")}
                    type="text"
                    disabled
                    className="w-24 rounded-md border bg-white"
                  />
                </div>
                <span className="text-xs text-red-200">
                  {errors.prefecture?.message}
                </span>
              </p>
              <p className="flex">
                <div className="w-16 text-center">性別</div>
                <div>
                  ：
                  <select {...register("gender")}>
                    <option value="">選択してください</option>
                    <option value="男">男</option>
                    <option value="女">女</option>
                    <option value="その他">その他</option>
                  </select>
                  <span className="text-red-200">{errors.gender?.message}</span>
                </div>
              </p>
            </div>
          </div>
          <div className="relative ml-4 flex w-4/5 justify-start">
            <img
              src="preview.jpeg"
              alt="鳴咽さん"
              className="absolute -left-12 top-6 size-12 rounded-full"
            />
            <div className="max-w-[80%] resize-none rounded-br-3xl rounded-tl-3xl rounded-tr-3xl border border-black bg-white px-4 py-3 text-black">
              こころのうんこを叫んでみよう！！
            </div>
          </div>
          <div className="relative mr-4 flex w-4/5 justify-end">
            <TextArea
              register={register("userInput", { required: true })}
              description={"にゅうりょくしてな"}
              direction={rightDirection}
            />
            <img
              src="preview.jpeg"
              alt="鳴咽さん"
              className="absolute -right-12 top-6 size-12 rounded-full"
            />
          </div>
          <span className="text-red-200">{errors.userInput?.message}</span>
          <button
            onClick={() => {
              handleButtonClick();
            }}
            type="submit"
          >
            ボタン
          </button>
        </form>
      </main>
      <BottomSheet />
    </>
  );
};
