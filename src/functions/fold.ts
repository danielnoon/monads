import { List } from "../types/list";

export const foldr =
  <A, B>(f: (x: A) => (y: B) => B) =>
  (init: B) =>
  (list: List<A> | null): B =>
    list === null ? init : f(list.head)(foldr(f)(init)(list.tail));

export const foldl =
  <A, B>(f: (x: A) => (y: B) => B) =>
  (init: B) =>
  (list: List<A> | null): B =>
    list === null ? init : f(list.head)(foldl(f)(init)(list.tail));
