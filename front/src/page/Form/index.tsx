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
  const [inputValue, setInputValue] = useState<string>("");
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

  const onChangeHandle = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(e.target.value);
  };

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
      <main className="flex flex-col items-center space-y-4">
        <div className="relative mt-4 flex max-w-[80%] items-center border p-4">
          <div className="absolute -left-4 -top-4 border bg-white">任意</div>
          <form onSubmit={onSubmit} className="space-y-2">
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
            <button type="submit">ここ</button>
          </form>
        </div>
        <div className="max-w-[80%] resize-none rounded-br-3xl rounded-tl-3xl rounded-tr-3xl border border-black bg-white px-4 py-3 text-black">
          入力した情報は本サービスの利用規約に則って利用されます
        </div>
        <TextArea
          onChangeHandle={onChangeHandle}
          description={"にゅうりょくしてな"}
          value={inputValue}
          direction={rightDirection}
        />
        <button
          onClick={() => {
            handleButtonClick();
          }}
        >
          ボタン
        </button>
      </main>
      <BottomSheet />
    </>
  );
};
