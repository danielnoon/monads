import { Applicative } from "../applicative";
import { concatMap } from "../functions/concatMap";
import { foldl } from "../functions/fold";
import { Functor } from "../functor";
import { Monad } from "../monad";

export class List<T> implements Functor<T>, Applicative<T>, Monad<T> {
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

  bind<U>(f: (x: T, ret: (x: U) => List<U>) => List<U>): List<U> {
    return concatMap((x: T) => f(x, this.pure))(this) as List<U>;
  }
}

export function list<T>(...elements: T[]): List<T> {
  return elements.reduceRight(
    (acc: List<T> | null, x) => new List(x, acc),
    null
  ) as List<T>;
}

export function string(str: string): List<string> {
  return list(...str.split(""));
}

export function print(str: List<string>) {
  return foldl<string, string>((prev) => (next) => prev + next)("")(str);
}
