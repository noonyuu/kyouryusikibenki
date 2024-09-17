import { z } from "zod";

export const formSchema = z.object({
  textInput: z
    .string({
      required_error: "何か叫んでね",
      invalid_type_error: "それは叫べないよ",
    })
    .min(2, { message: "2文字以上入力してください" })
    .max(50, { message: "50文字以内で入力してください" })
    .trim()
    .nonempty("何か叫んでね"),
});

export type formSchema = z.input<typeof formSchema>;
