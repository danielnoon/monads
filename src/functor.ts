import { Applicative } from "./applicative";

export interface Functor<T> {
  kind: string;
  map<U>(f: (x: T) => U): Functor<U>;
}
