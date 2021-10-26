import { fmap } from "../src/functor";
import { list } from "../src/types/list";
import { just, nothing } from "../src/types/maybe";

it("should map a Just value to another Just value.", () => {
  const add = (x: number) => (y: number) => x + y;

  const result = fmap(add(3), just(5));

  expect(result).toEqual(just(8));
});

it("should map a Nothing value to Nothing", () => {
  const add = (x: number) => (y: number) => x + y;

  const result = fmap(add(3), nothing());

  expect(result).toEqual(nothing());
});

it("should map a List to a new List", () => {
  const add = (x: number) => (y: number) => x + y;

  const result = fmap(add(3), list(1, 2, 3));

  expect(result).toEqual(list(4, 5, 6));
});

it("should map a List of maybes", () => {
  const add = (x: number) => (y: number) => x + y;

  const result = fmap(
    (maybe) => fmap(add(3), maybe),
    list(just(1), just(2), just(3), nothing())
  );

  expect(result).toEqual(list(just(4), just(5), just(6), nothing()));
});
