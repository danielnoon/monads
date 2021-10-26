import { concatMap } from "../../src/functions/concatMap";
import { list } from "../../src/types/list";

it("should map two lists and concatenate them", () => {
  const l1 = list(1, 2, 3);

  const result = concatMap((x: number) => list(x, x + 1))(l1);

  expect(result).toEqual(list(1, 2, 2, 3, 3, 4));
});
