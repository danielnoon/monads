import { Applicative } from "../applicative";
import { Functor } from "../functor";

export class Just<T> implements Functor<T>, Applicative<T> {
  kind = "Just";

  constructor(private value: T) {}

  map<U>(f: (x: T) => U): Just<U> {
    return new Just(f(this.value));
  }

  apply<U>(f: Maybe<(x: T) => U>): Maybe<U> {
    if (f instanceof Nothing) return new Nothing();
    return new Just(f.value(this.value));
  }

  pure<U>(x: U): Applicative<U> {
    return new Just(x);
  }
}

export class Nothing implements Functor<any>, Applicative<any> {
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

export function nothing(): Maybe<any> {
  return new Nothing();
}
