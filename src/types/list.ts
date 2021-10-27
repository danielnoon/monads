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

  apply<U>(fs: List<(x: T) => U>, xs: List<T>): List<U> {
    // concatMap (\i -> map (\j -> (i, j)) [i+1 .. 4]) [1 .. 4]
    return concatMap((i: T) => fmap((f: (x: T) => U) => f(i))(fs) as List<U>)(
      xs
    ) as List<U>;
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
