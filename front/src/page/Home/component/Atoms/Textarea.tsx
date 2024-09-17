import { FC, forwardRef, Ref, useRef } from "react";
import "../../style/index.css";

type TextareaProps = {
  placeholder: string;
};

export const Textarea: FC<TextareaProps> = forwardRef<
  HTMLTextAreaElement,
  TextareaProps
>(({ placeholder, ...props }, ref: Ref<HTMLTextAreaElement>) => {
  const audioRefs = useRef<(HTMLAudioElement | null)[]>([]);

  const keySounds = ["/onara.mp3", "/unko.mp3"];

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
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
      {keySounds.map((sound, index) => (
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
        placeholder={placeholder}
        // TODO: 色とかをちゃんとprpsで受け取る
        className="flex w-full resize-none items-center bg-slate-950 text-sm text-white focus:outline-none"
        rows={1}
        ref={ref}
        {...props}
      />
    </>
  );
});
