import { ChangeEvent, FC, useRef } from "react";

// 左方向の定義
export type Left = {
  direction: "left";
  prepay: string;
};

// 右方向の定義
export type Right = {
  direction: "right";
  prepay: string;
};

// カスタムUnion型
type Direction = Left | Right;

type TextAreaProps = {
  description: string;
  direction: Direction;
  register?: any;
};

export const TextArea: FC<TextAreaProps> = ({
  description,
  // value,
  // onChangeHandle,
  direction,
  register,
}) => {
  const audioRefs = useRef<(HTMLAudioElement | null)[]>([]);

  const sounds = ["/onara.mp3", "/unko.mp3"];

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      // エンターキーが押されたとき
      const unkoAudio = audioRefs.current[1];
      if (unkoAudio) {
        unkoAudio.currentTime = 0;
        unkoAudio.play();
      }
    } else {
      // その他のキーが押されたとき
      const onaraAudio = audioRefs.current[0];
      if (onaraAudio) {
        onaraAudio.currentTime = 0;
        onaraAudio.play();
      }
    }
  };
  return (
    <>
      {sounds.map((sound, index) => (
        <audio
          key={index}
          ref={(e) => (audioRefs.current[index] = e)}
          src={sound}
          preload="auto"
        />
      ))}
      <textarea
        onKeyDown={handleKeyDown}
        wrap="hard"
        className={`w-[80%] resize-none ${direction.prepay} rounded-tl-3xl rounded-tr-3xl border border-black bg-white px-4 py-3 text-black`}
        placeholder={description}
        {...register}
      />
    </>
  );
};
