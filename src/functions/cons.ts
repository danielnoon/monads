import { List } from "../types/list";

export const cons =
  <T>(x: T) =>
  (xs: List<T> | null) =>
    new List(x, xs);
