import { cons } from "../../src/functions/cons";
import { list } from "../../src/types/list";

it("should create a list from nothing", () => {
  expect(cons(1)(null)).toEqual(list(1));
});

it("should prepend to a list", () => {
  expect(cons(1)(list(2))).toEqual(list(1, 2));
});

it("should chain", () => {
  const l = list(1, 2, 3);

  const result = cons(2)(cons(4)(l));

  expect(result).toEqual(list(2, 4, 1, 2, 3));
});
