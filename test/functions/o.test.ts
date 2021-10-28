import { o } from "../../src/functions/o";

it("should compose two functions", () => {
  const f = (x: number) => x + 1;
  const g = (x: number) => x * 2;
  const h = o(f)(g);
  expect(h(3)).toBe(7);
});
