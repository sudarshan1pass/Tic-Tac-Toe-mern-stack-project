export const getAIMove = (board) => {
  const emptyCells = board
    .map((val, i) => (val === null ? i : null))
    .filter((v) => v !== null);

  if (emptyCells.length === 0) return null;

  const randomIndex = Math.floor(Math.random() * emptyCells.length);
  return emptyCells[randomIndex];
};