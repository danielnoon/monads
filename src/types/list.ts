import { Applicative } from "../applicative";
import { append } from "../functions/append";
import { concatMap } from "../functions/concatMap";
import { fmap, Functor } from "../functor";
import { just, Maybe, nothing, Nothing } from "./maybe";

export class List<T> implements Functor<T>, Applicative<T> {
  kind = "List";

  constructor(public head: T, public tail: List<T> | null) {}

  map<U>(f: (x: T) => U): List<U> {
    if (this.tail) {
      return new List(f(this.head), this.tail.map(f));
    } else {
      return new List(f(this.head), null);
    }
  }

  private applyRecursive<T, U>(
    f: List<(x: T) => U>,
    x: List<T>
  ): List<U> | null {
    if (x.tail && f.tail) {
      return append(fmap(f.head)(x) as List<U>)(
        f.tail.applyRecursive(f.tail, x)
      );
    } else {
      return null;
    }
  }

  apply<U>(f: List<(x: T) => U>, x: List<T>): List<U> {
    return this.pure(f);
  }

  pure<U>(x: U): List<U> {
    return new List(x, null);
  }
}

export function list<T>(...elements: T[]): List<T> {
  return elements.reduceRight(
    (acc: List<T> | null, x) => new List(x, acc),
    null
  ) as List<T>;
}

export function indexOf<T>(list: List<T>, x: T): Maybe<number> {
  if (list.head === x) {
    return just(0);
  }
  if (list.tail === null) {
    return nothing();
  }

  return fmap((x: number) => x + 1)(indexOf(list.tail, x)) as Maybe<number>;
}
