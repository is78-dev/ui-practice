import { mv } from "./mv";

const list = ["A", "B", "C", "D", "E"];

describe("正常パターン", () => {
  test("C->A", () => expect(mv(list, 2, 0)).toEqual("CABDE".split("")));
  test("C->C", () => expect(mv(list, 2, 2)).toEqual(list));
  test("C->D", () => expect(mv(list, 2, 3)).toEqual("ABDCE".split("")));
  test("A->E", () => expect(mv(list, 0, 4)).toEqual("BCDEA".split("")));
  test("E->A", () => expect(mv(list, 4, 0)).toEqual("EABCD".split("")));
});

describe("異常パターン", () => {
  test("インデックスオーバー時は最後尾へ", () =>
    expect(mv(list, 2, 8)).toEqual("ABDEC".split("")));
  test("負のインデックス時は末尾から", () =>
    expect(mv(list, 2, -1)).toEqual("ABDCE".split("")));
  test("移動元が存在しないならそのまま", () =>
    expect(mv(list, 6, 0)).toEqual(list));
});
