import { Applicative } from "./applicative";

export interface Functor<T> {
  kind: string;
  map<U>(f: (x: T) => U): Functor<U>;
}

// export function fmap<T, U>(f: (y: T) => U): (x: Applicative<T>) => Applicative<U>;
// export function fmap<T, U>(f: (y: T) => U): (x: Functor<T>) => Functor<U>;
// export function fmap<T, U, F extends Functor<T>, R extends Functor<U>>(f: (y: T) => U): R {
//   return (x: F) => x.map(f);
// }

export const fmap =
  <T, U, F extends Functor<T>>(f: (y: T) => U) =>
  (x: F) =>
    x.map(f);
