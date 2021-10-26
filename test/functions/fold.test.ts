import { foldr } from "../../src/functions/fold";
import { list } from "../../src/types/list";

it("should sum a list of numbers", () => {
  const nums = list(1, 2, 3, 4);
  const add = (x: number) => (y: number) => x + y;

  const result = foldr(add)(0)(nums);

  expect(result).toBe(10);
});
