export const randomNumber = (min: number, max: number): number => {
  return Math.floor((Math.random() * (max + min)) + min);
};

export const AROUND_CELL_OPERATORS = [
  [-1, -1], [-1, 0], [-1, 1],
  [0, -1], [0, 1],
  [1, -1], [1, 0], [1, 1],
];

