import { Functor } from "./functor";

export interface Applicative<T> extends Functor<T> {
  apply<U>(f: Functor<(x: T) => U>, x: Functor<T>): Functor<U>;
  pure<U>(x: U): Applicative<U>;
}

export const apply =
  <T, U>(f: Functor<(x: T) => U>) =>
  (x: Functor<T>): Functor<U> => {
    if (applicative(x)) {
      return x.apply(f, x);
    } else {
      throw new Error("apply: x is not an applicative");
    }
  };

export function applicative<T>(functor: Functor<T>): functor is Applicative<T> {
  if ((functor as Applicative<T>).apply) {
    return true;
  }

  return false;
}

// export function pure<T>(x: T): Functor<T> {
//   if (applicative(x)) {
//     return x.apply(f, x);
//   } else {
//     throw new Error("apply: x is not an applicative");
//   }
// }
// export function apply<V, T = Functor<V>>(
//   f: Functor<(x: T) => V>,
//   x: Functor<T>
// ) {
//   return f.map((g) => x.map((y) => g(y)));
// }
