import { snakeCase } from 'snake-case';

export default (src: Record<string, number | Date | string>) => Object.entries(src).reduce(
  (acc, pair) => ({
    ...acc,
    [snakeCase(pair[0])]: pair[1],
  }),
  {},
);
