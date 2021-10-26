import { Applicative } from "../applicative";
import { Functor } from "../functor";

export class Just<T> implements Functor<T>, Applicative<T> {
  kind = "Just";

  constructor(private value: T) {}

  map<U>(f: (x: T) => U): Just<U> {
    return new Just(f(this.value));
  }

  apply<U>(f: Just<(x: T) => U>, x: Just<T>): Just<U> {
    return new Just(f.value(x.value));
  }

  pure<U>(x: U): Applicative<U> {
    return new Just(x);
  }
}

export class Nothing implements Functor<unknown>, Applicative<unknown> {
  kind = "Nothing";

  map() {
    return new Nothing();
  }

  apply() {
    return new Nothing();
  }

  pure<U>(x: U): Applicative<U> {
    return new Just(x);
  }
}

export type Maybe<T> = Just<T> | Nothing;

export function just<T>(value: T): Maybe<T> {
  return new Just(value);
}

export function nothing<T>(): Maybe<T> {
  return new Nothing();
}
