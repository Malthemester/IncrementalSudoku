import { MakeSudoku, RemoveNumbers, CheckSukoku, FillArray, CheckSquare, CheckRowAndCulumn} from "./generatorSudoku"

test("Check fillarray", () => {
    expect(FillArray(3)).toStrictEqual([1, 2, 3]);
});

let boardSolved4x4 =
[
    [[1], [2], [3], [4]],
    [[3], [4], [1], [2]],
    [[2], [1], [4], [3]],
    [[4], [3], [2], [1]]
]

let boardFalse4x4 =
[
    [[], [2], [3], [4]],
    [[3], [4], [1], [2]],
    [[2], [4], [4], [3]],
    [[4], [3], [2], [1]]
]

let boardSolved9x9 =
[
    [[1], [2]],
    [[2], [1]]
]

test("Check CheckSquare 4x4", () => {
    expect(CheckSquare(boardSolved4x4, 4, 2, 0, 0)).toBe(true);
    expect(CheckSquare(boardFalse4x4, 4, 2, 0, 0)).toBe(false);
});

test("Check CheckSquare 2x2", () => {
    expect(CheckSquare(boardSolved2x2, 2, 2, 0, 0)).toBe(true);
});

test("Check CheckRowAndCulumn 4x4", () => {
    expect(CheckRowAndCulumn(0, boardSolved4x4, 4)).toBe(true);
});


test("Check CheckRowAndCulumn 2x2", () => {
    expect(CheckRowAndCulumn(0, boardSolved2x2, 2)).toBe(true);
});