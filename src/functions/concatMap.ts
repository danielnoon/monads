import { List } from "../types/list";
import { concat } from "./concat";

export const concatMap =
  <A, B>(f: (a: A) => List<B>) =>
  (list: List<A> | null): List<B> | null =>
    list === null ? null : concat(f(list.head))(concatMap(f)(list.tail));
