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

function IsInSolve(id, checkFild){
    let solveList = LoadSolution(id + "curSolveList")

    if (solveList == "")
        return

    solveList = solveList.split(",")

    let sovle = solveList.find(solve => solve == checkFild)

    return sovle != undefined
}

export { SolveOne, IsInSolve }