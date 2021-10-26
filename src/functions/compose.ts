export const compose =
  <T, U, R>(f: (x: T) => U) =>
  (g: (y: U) => R) =>
  (x: T) =>
    g(f(x));
