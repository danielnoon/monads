import { Functor } from "./functor";

export interface Applicative<T> {
  apply<U>(f: Functor<(x: T) => U>, x: Functor<T>): Functor<U>;
}

export function apply<T, U>(
  f: Functor<(x: T) => U> & Applicative<T>,
  x: Functor<T>
): Functor<U> {
  return f.apply(f, x);
}

// export function apply <V, T = Functor<V>>(f: Functor<(x: T) => V>, x: T): V {
//   return f.map(f => f(x));
// }
