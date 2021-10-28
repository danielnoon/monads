export interface Monad<T> {
  bind<U>(f: (x: T, ret: (x: U) => Monad<U>) => Monad<U>): Monad<U>;
}
