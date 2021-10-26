import { Applicative } from "../apply";
import { Functor } from "../functor";

export class Just<T> implements Functor<T>, Applicative<T> {
  constructor(private value: T) {}

  map<U>(f: (x: T) => U): Functor<U> {
    return new Just(f(this.value));
  }

  apply<U>(f: Just<(x: T) => U>, x: Just<T>): Just<U> {
    const val = x.value;
    const func = f.value;
    return new Just(func(val));
  }
}

export class Nothing implements Functor<null>, Applicative<null> {
  map() {
    return new Nothing();
  }

  apply() {
    return new Nothing();
  }
}

export type Maybe<T> = Just<T> | Nothing;

export function just<T>(value: T): Maybe<T> {
  return new Just(value);
}

export function nothing<T>(): Maybe<T> {
  return new Nothing();
}

// export function maybe<T>(m: Maybe<T>, ): T {
