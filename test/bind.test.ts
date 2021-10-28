import { list } from "../src/types/list";
import { just } from "../src/types/maybe";

it("should bind just value", () => {
  const result = just(9).bind((x: number, ret) => ret(x * 10));

  expect(result).toEqual(just(90));
});

it("should bind a list value", () => {
  const result = list(1, 2, 3).bind((x, ret) => ret(x * 10));

  expect(result).toEqual(list(10, 20, 30));
});
