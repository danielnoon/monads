import { just, Maybe, nothing } from "../src/types/maybe";

type Birds = number;
type Pole = [Birds, Birds];

type landConst = (n: Birds) => (pole: Pole) => Pole;

const landLeftC: landConst =
  (n) =>
  ([l, r]) =>
    [l + n, r];

const landRightC: landConst =
  (n) =>
  ([l, r]) =>
    [l, r + n];

type landMaybe = (n: Birds) => (pole: Pole) => Maybe<Pole>;
const landLeft: landMaybe =
  (n) =>
  ([l, r]) =>
    Math.abs(l + n - r) < 4 ? just([l + n, r]) : nothing();

const landRight: landMaybe =
  (n) =>
  ([l, r]) =>
    Math.abs(r + n - l) < 4 ? just([l, r + n]) : nothing();

it("should land left 2 birds on pole [0, 0]", () => {
  const init: Pole = [0, 0];

  const result = landLeftC(2)(init);

  expect(result).toEqual([2, 0]);
});

it("should land right 1 birds on pole [1, 2]", () => {
  const init: Pole = [1, 2];

  const result = landRightC(1)(init);

  expect(result).toEqual([1, 3]);
});

it("should work with multiple applications of land", () => {
  const init: Pole = [0, 0];

  const result = landLeftC(2)(landRightC(1)(landLeftC(1)(init)));

  expect(result).toEqual([3, 1]);
});

it("should result in just if few enough birds land", () => {
  const init: Pole = [0, 0];

  const result = landLeft(2)(init);

  expect(result).toEqual(just([2, 0]));
});

it("should result in nothing if too many birds land", () => {
  const init: Pole = [0, 3];

  const result = landLeft(10)(init);

  expect(result).toEqual(nothing());
});

it("should bind to a second call of land", () => {
  const init: Pole = [0, 0];

  const result = landRight(1)(init).bind(landLeft(2));

  expect(result).toEqual(just([2, 1]));
});

it("should bind to n calls of land", () => {
  const init: Pole = [0, 0];

  const result = landRight(1)(init)
    .bind(landLeft(2))
    .bind(landRight(2))
    .bind(landLeft(1));

  expect(result).toEqual(just([3, 3]));
});

it("should fail for large landings", () => {
  const init: Pole = [0, 0];

  const result = landRight(4)(init);

  expect(result).toEqual(nothing());
});

it("should fail continually in a chain", () => {
  const init: Pole = [0, 0];

  const result = landRight(1)(init)
    .bind(landLeft(6))
    .bind(landRight(2))
    .bind(landLeft(1));

  expect(result).toEqual(nothing());
});
