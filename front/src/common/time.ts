export const getCurrentDateTimeRFC3339 = (): string => {
  const now = new Date();

  // ISO 8601フォーマットを取得
  const isoString = now.toISOString();

  const rfc3339String = isoString.replace(/\.\d+Z$/, "Z");

  return rfc3339String;
};
