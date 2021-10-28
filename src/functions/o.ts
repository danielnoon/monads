export const o =
  <U, R>(f: (x: U) => R) =>
  <T>(g: (x: T) => U) =>
  (x: T): R =>
    f(g(x));
