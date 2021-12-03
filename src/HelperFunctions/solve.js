import { LoadSolution, SaveResources } from "./saveValue"

function SolveOne(board, id, highlight = false) {

    let solveList = LoadSolution(id + "curSolveList")

    if (solveList == "")
        return

    solveList = solveList.split(",")

    for (let i = 0; i < solveList.length; i++) {
        let trySolve = solveList[0].split("")

        if (board[trySolve[0]][trySolve[1]] != trySolve[2]) {

            solveList.shift()
            if (!highlight)
                SaveResources(id + "curSolveList", solveList)

            return trySolve
        }
        solveList.shift()
    }
}

function IsInSolve(id, checkFild, board){
    let solveList = LoadSolution(id + "curSolveList")

    if (solveList == "")
        return false

    solveList = solveList.split(",")

    if (board[checkFild[0]][checkFild[1]] == checkFild[2])
        return false

    let sovle = solveList.find(solve => solve == checkFild)

    return sovle != undefined
}

export { SolveOne, IsInSolve }