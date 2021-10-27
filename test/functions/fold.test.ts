import { foldl, foldr } from "../../src/functions/fold";
import { list } from "../../src/types/list";

it("(foldr) should sum a list of numbers", () => {
  const nums = list(1, 2, 3, 4);
  const add = (x: number) => (y: number) => x + y;

  const result = foldr(add)(0)(nums);

  expect(result).toBe(10);
});

it("(foldl) should sum a list of numbers", () => {
  const nums = list(1, 2, 3, 4);
  const add = (x: number) => (y: number) => x + y;

  const result = foldl(add)(0)(nums);

  expect(result).toBe(10);
});

it("should be fmappable", () => {
  const nums = list(list(1, 2, 3, 4), list(5, 6, 7, 8));
  const add = (x: number) => (y: number) => x + y;

  const result = nums.map(foldl(add)(0));

  expect(result).toEqual(list(10, 26));
});
