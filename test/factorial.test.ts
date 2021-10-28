import { mul } from "../src/functions/arithmetic";
import { o } from "../src/functions/o";
import { foldr } from "../src/functions/fold";
import { list } from "../src/types/list";

type factorial = (n: number) => number;

const enumFromTo = (from: number) => (to: number) => {
  const result = [];
  for (let i = from; i <= to; i++) {
    result.push(i);
  }
  return list(...result);
};

const factorial = o(foldr(mul)(1))(enumFromTo(1));

it("should find the factorial of 6", () => {
  expect(factorial(6)).toEqual(720);
});
