import { add } from "../src/functions/arithmetic";
import { list } from "../src/types/list";
import { just, nothing } from "../src/types/maybe";

it("should map a Just value to another Just value.", () => {
  const result = just(5).map(add(3));

  expect(result).toEqual(just(8));
});

it("should map a Nothing value to Nothing", () => {
  const result = nothing().map(add(3));

  expect(result).toEqual(nothing());
});

it("should map a List to a new List", () => {
  const result = list(1, 2, 3).map(add(3));

  expect(result).toEqual(list(4, 5, 6));
});

it("should map a List of maybes", () => {
  const result = list(just(1), just(2), just(3), nothing()).map((e) =>
    e.map(add(3))
  );

  expect(result).toEqual(list(just(4), just(5), just(6), nothing()));
});
