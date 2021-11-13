import { LoadSolution, SaveResources } from "./saveValue"

function SolveOne(board) {

    let solveList = LoadSolution("curSolveList")

    if(solveList == "")
        return

    solveList = solveList.split(",")

    for (let i = 0; i < solveList.length; i++) {
        let trySolve = solveList[0].split("")

        if (board[trySolve[0]][trySolve[1]] != trySolve[2]) {

            solveList.shift()
            SaveResources("curSolveList", solveList)
            
            return trySolve
        }
        solveList.shift()
    }
}

export{SolveOne}