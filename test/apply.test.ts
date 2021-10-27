import { list } from "../src/types/list";
import { just } from "../src/types/maybe";

it("should apply a just function", () => {
  const add = (a: number) => (b: number) => a + b;
  const justFunc = just(1).map(add);

  const result = just(2).apply(justFunc);

  expect(result).toEqual(just(3));
});

it("should apply a list function", () => {
  const add = (a: number) => (b: number) => a + b;
  const listFunc = list(1, 2).map(add);

  const result = list(3, 4).apply(listFunc);

  expect(result).toEqual(list(4, 5, 5, 6));
});
