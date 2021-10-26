import { fmap } from "../functor";
import { List } from "../types/list";
import { append } from "./append";

export const concatMap =
  <A, B>(f: (item: A) => List<B>) =>
  (list: List<A>): List<B> => {
    const x = fmap(f)(list);
    // return append(x)(list);
  };
