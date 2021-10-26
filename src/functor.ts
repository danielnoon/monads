export interface Functor<T> {
  map<U>(f: (x: T) => U): Functor<U>;
}

export function fmap<T, U>(f: (y: T) => U, x: Functor<T>): Functor<U> {
  return x.map(f);
}
