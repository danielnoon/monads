import { List } from "../types/list";
import { append } from "./append";

export const concatMap =
  <A, B>(f: (a: A) => List<B>) =>
  (list: List<A> | null): List<B> | null =>
    list === null ? null : append(f(list.head))(concatMap(f)(list.tail));
