export const getRandomPosition = (maxWidth: number, maxHeight: number) => {
  const x = Math.floor(Math.random() * maxWidth);
  const y = Math.floor(Math.random() * maxHeight);
  return { x, y };
};
