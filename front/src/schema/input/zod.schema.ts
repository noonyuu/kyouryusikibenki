import { z } from "zod";

// 都道府県リスト
const PREFECTURES = [
  "北海道",
  "青森県",
  "岩手県",
  "宮城県",
  "秋田県",
  "山形県",
  "福島県",
  "茨城県",
  "栃木県",
  "群馬県",
  "埼玉県",
  "千葉県",
  "東京都",
  "神奈川県",
  "新潟県",
  "富山県",
  "石川県",
  "福井県",
  "山梨県",
  "長野県",
  "岐阜県",
  "静岡県",
  "愛知県",
  "三重県",
  "滋賀県",
  "京都府",
  "大阪府",
  "兵庫県",
  "奈良県",
  "和歌山県",
  "鳥取県",
  "島根県",
  "岡山県",
  "広島県",
  "山口県",
  "徳島県",
  "香川県",
  "愛媛県",
  "高知県",
  "福岡県",
  "佐賀県",
  "長崎県",
  "熊本県",
  "大分県",
  "宮崎県",
  "鹿児島県",
  "沖縄県",
  "",
] as const;

export type Prefecture = (typeof PREFECTURES)[number];

// Zod スキーマ
export const zodSchema = z.object({
  age: z
    .string()
    .nullable()
    .refine((val) => val === null || val === "" || /^[0-9]+$/.test(val), {
      message: "年齢は数値である必要があります",
    })
    .refine(
      (val) =>
        val === null || val === "" || (val.length >= 1 && val.length <= 2),
      { message: "不適切な値です" },
    )
    .transform((val) => (val ? Number(val) : null)),
  prefecture: z
    .enum(PREFECTURES, { message: "無効な都道府県です" })
    .refine((value) => PREFECTURES.includes(value), {
      message: "無効な都道府県です",
    }),
  gender: z
    .string()
    .nullable()
    .refine((val) => val === "" || val === "男" || val === "女", {
      message: "男か女かその他選択してください",
    }),
  userInput: z.string().min(2, { message: "2文字以上入力してください" }),
});

export type ZodSchemaType = z.infer<typeof zodSchema>;
