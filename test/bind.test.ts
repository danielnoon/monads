import { just } from "../src/types/maybe";

it("should bind just value", () => {
  const result = just(9).bind((x, ret) => ret(x * 10));

  expect(result).toEqual(just(90));
});
