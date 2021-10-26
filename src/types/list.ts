import { Functor } from "../functor";
import { Nothing } from "./maybe";

export class List<T> implements Functor<T> {
  constructor(private head: T, private tail: List<T> | Nothing) {}

  map<U>(f: (x: T) => U): List<U> {
    return new List(f(this.head), this.tail.map(f));
  }
}

export function list<T>(...elements: T[]): List<T> {
  return elements.reduceRight(
    (acc: List<T> | Nothing, x) => new List(x, acc),
    new Nothing()
  ) as List<T>;
}
