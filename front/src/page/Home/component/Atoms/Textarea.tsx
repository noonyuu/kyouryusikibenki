import { FC, forwardRef, Ref } from "react";
import "../../style/index.css";

type TextareaProps = {
  placeholder: string;
};

export const Textarea: FC<TextareaProps> = forwardRef<
  HTMLTextAreaElement,
  TextareaProps
>(({ placeholder, ...props }, ref: Ref<HTMLTextAreaElement>) => {
  return (
    <textarea
      placeholder={placeholder}
      className="w-full resize-none focus:outline-none bg-slate-950 text-white text-sm flex items-center"
      rows={1}
      ref={ref}
      {...props}
    />
  );
});
