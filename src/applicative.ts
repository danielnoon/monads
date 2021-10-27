import { Functor } from "./functor";

export interface Applicative<T> extends Functor<T> {
  apply<U>(f: Applicative<(x: T) => U>): Applicative<U>;
  pure<U>(x: U): Applicative<U>;
}
