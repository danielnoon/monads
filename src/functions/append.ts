import { List } from "../types/list";

const appendRecursive =
  <T>(xs: List<T> | null) =>
  (ys: List<T> | null): null | List<T> =>
    xs === null ? ys : new List(xs.head, appendRecursive(xs.tail)(ys));

export const append =
  <T>(xs: List<T> | null) =>
  (ys: List<T> | null): List<T> | null =>
    appendRecursive(xs)(ys);
