import { Maybe, Nothing } from "../types/maybe";

export function isNothing(x: Maybe<unknown>) {
  return x instanceof Nothing;
}
