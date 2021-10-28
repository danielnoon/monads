import { List } from "../types/list";

const concatR =
  <T>(xs: List<T> | null) =>
  (ys: List<T> | null): null | List<T> =>
    xs === null ? ys : new List(xs.head, concatR(xs.tail)(ys));

export const concat =
  <T>(xs: List<T> | null) =>
  (ys: List<T> | null): List<T> | null =>
    concatR(xs)(ys);
