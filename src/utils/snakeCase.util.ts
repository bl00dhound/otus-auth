import { snakeCase } from 'snake-case';

export const toSnakeCase = (src: Record<string, number | Date | string>) =>
  Object.entries(src).reduce(
    (acc, pair) => ({
      ...acc,
      [snakeCase(pair[0])]: pair[1],
    }),
    {},
  );
