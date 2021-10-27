import { apply } from "../src/applicative";
import { fmap } from "../src/functor";
import { List, list } from "../src/types/list";
import { just } from "../src/types/maybe";

it("should apply a just function", () => {
  const add = (a: number) => (b: number) => a + b;
  const justFunc = fmap(add)(just(1));

  const result = apply(justFunc)(just(2));

  expect(result).toEqual(just(3));
});

it("should apply a list function", () => {
  const add = (a: number) => (b: number) => a + b;
  const listFunc = fmap(add)(list(1, 2));

  const result = apply(listFunc)(list(3, 4));

  expect(result).toEqual(list(4, 5, 5, 6));
});
