export const getCurrentDateTimeRFC3339 = (): string => {
  const now = new Date();

  // ISO 8601フォーマットを取得
  const isoString = now.toISOString();

  const rfc3339String = isoString.replace(/\.\d+Z$/, "Z");

  return rfc3339String;
};

export const convertDateTime = (data: string): string => {
  const date = new Date(data);

  const formattedDate = `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`;

  console.log(formattedDate);
  return formattedDate;
};
