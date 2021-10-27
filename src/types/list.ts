import { Applicative } from "../applicative";
import { concatMap } from "../functions/concatMap";
import { Functor } from "../functor";

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

  apply<U>(fs: List<(x: T) => U>): List<U> {
    return concatMap((i: T) => fs.map((f) => f(i)))(this) as List<U>;
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
