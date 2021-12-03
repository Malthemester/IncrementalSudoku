import Sudoku from './sudoku'
import Complete from './complete'
import { MakeSudoku, RemoveNumbers, CheckSukoku } from '../HelperFunctions/generatorSudoku'
import { useEffect, useState, useRef } from "react"
import { SaveBoard, LocalToArray, LoadResources, SaveResources } from '../HelperFunctions/saveValue'
import { CollectResources } from '../HelperFunctions/getResources'
import { Shop, shopItems } from './shop'
import { SolveOne, IsInSolve } from '../HelperFunctions/solve'

export function Board(props) {
    let size = props.size
    let squares = props.squares
    let remove = props.remove
    let resources = props.resources

    let shopItemsTemp = shopItems()

    const [gameBoard, SetGameBoard] = useState(Array(size).fill(Array(size).fill(null)))
    const [solved, SetSolved] = useState(false)
    const [FillBar, SetFillBar] = useState(0)
    const [Amounts, SetAmounts] = useState([3, 2])
    const [Actives, SetActives] = useState([false, false, false])
    const [Intervals, SetIntervals] = useState([1000])

    useEffect(() => {
        GetIncrementels()
        AmountParTime()
        let savedBoard = localStorage.getItem(props.id + "curBoard")
        if (savedBoard != null) {

            let curBoard = LocalToArray(savedBoard)
            SetGameBoard(curBoard)
        }
        else {
            NewGame(size, squares);
        }
    }, [])


    useEffect(() => {
        SetSolved(CheckSukoku(size, gameBoard, squares))

        if (Actives[2])
            HighlightFild()

    }, [gameBoard, Actives])

    useInterval(clickBar, Amounts[0], Actives[0], Intervals[0])

    useEffect(() => {
        if (Actives[1] && solved)
            collect(`${size}x${size}`, Amounts[1], size, squares)
    }, [solved])

    useEffect(() => {
        AmountParTime()
    }, [Intervals, Amounts])

    function GetIncrementels() {
        let shop = shopItemsTemp
        let tempActives = Actives
        let tempIntervals = Intervals
        let tempAmounts = Amounts

        tempActives[0] = LoadResources(props.id + shop[0].Name) > 0
        tempIntervals[0] = shop[1].IncremenAmount(LoadResources(props.id + shop[1].Name))
        tempAmounts[0] = shop[2].IncremenAmount(LoadResources(props.id + shop[2].Name))
        tempActives[2] = LoadResources(props.id + shop[3].Name) > 0
        tempActives[1] = LoadResources(props.id + shop[4].Name) > 0
        tempAmounts[1] = shop[5].IncremenAmount(LoadResources(props.id + shop[5].Name))

        SetIntervals(tempIntervals)
        SetActives(tempActives)
        SetAmounts(tempAmounts)
    }

    function AmountParTime() {
        if (Actives[0]) {

            let tempResources = resources
            let name = `${size}x${size}`

            let fildParSec = 100 / (1000 / Math.max(Intervals[0], 0.01) * Amounts[0])

            let removePoints = (Amounts[1] * (size * size)) / (fildParSec * remove)

            let incremenAmount = (Amounts[1] / fildParSec) + removePoints

            tempResources.find(resource => resource.Name == name).IncremenAmount = incremenAmount

            props.setResources([...tempResources])
        }
    }   

    function HighlightFild() {
        let nextSolve = SolveOne(gameBoard, props.id, true)
        let tempGameBoard = [...gameBoard]

        if (nextSolve == null ||
            tempGameBoard[nextSolve[0]][nextSolve[1]] == null ||
            tempGameBoard[nextSolve[0]][nextSolve[1]].includes("h")) {
            return
        }
        tempGameBoard[nextSolve[0]][nextSolve[1]] = tempGameBoard[nextSolve[0]][nextSolve[1]] + "h"
        SetGameBoard(tempGameBoard)
        SaveBoard(tempGameBoard, `${props.id}curBoard`)
    }

    function NewGame(size, squares) {
        let newBoard = MakeSudoku(size, squares)
        newBoard = RemoveNumbers(newBoard, remove, props.id)
        SetGameBoard(newBoard)
        SaveBoard(newBoard, props.id + `curBoard`)
    }

    function Purchase(costs, keyName, max) {

        let tempMax = LoadResources(keyName)
        if (tempMax >= max) {
            return
        }

        SaveResources(keyName, tempMax + 1)
        let tempResources = resources

        costs.forEach(price => {
            let resourceIndex = tempResources.findIndex(resource => resource.Name == price[0])
            tempResources[resourceIndex].Value = tempResources[resourceIndex].Value - price[1]
            SaveResources(price[0], tempResources[resourceIndex].Value)
        })

        props.setResources([...tempResources])
    }

    function PurchaseClicker(cost, keyName, max, id) {
        Purchase(cost, id + keyName, max)
        let tempActive = Actives
        tempActive[0] = true
        SetActives([...tempActive])
        AmountParTime()
    }

    function PurchaseClickerSpeed(cost, keyName, max, id) {
        Purchase(cost, id + keyName, max)
        let purchaseAmount = LoadResources(props.id + keyName)

        let tempIntervals = Intervals
        tempIntervals[0] = shopItemsTemp[1].IncremenAmount(purchaseAmount)

        SetIntervals([...tempIntervals])
    }

    function PurchaseClickerStrengh(cost, keyName, max, id) {
        Purchase(cost, id + keyName, max)

        let purchaseAmount = LoadResources(props.id + keyName)
        let tempAmounts = Amounts
        tempAmounts[0] = shopItemsTemp[2].IncremenAmount(purchaseAmount)
        SetAmounts([...tempAmounts])
    }

    function PurchaseCompleter(cost, keyName, max, id) {
        Purchase(cost, id + keyName, max)
        let tempActive = Actives
        tempActive[1] = true
        SetActives([...tempActive])
    }

    function PurchaseIncrease4x4(cost, keyName, max) {
        Purchase(cost, props.id + keyName, max)

        let purchaseAmount = LoadResources(props.id + keyName)
        let tempAmounts = Amounts
        tempAmounts[1] = shopItemsTemp[5].IncremenAmount(purchaseAmount)
        SetAmounts([...tempAmounts])
    }

    function PurchaseHighlight(cost, keyName, max, id) {
        Purchase(cost, id + keyName, max)
        let tempActive = Actives
        tempActive[2] = true
        SetActives([...tempActive])
    }

    function clickBar(barFill) {
        let tempFill = FillBar + barFill

        if (tempFill >= 100) {
            if (solved) {
                SetFillBar(100)
            }
            else {
                SetFillBar(0)
                NewSolve(SolveOne(gameBoard, props.id))
            }
        }
        else
            SetFillBar(tempFill)
    }

    class PurchaseFunc {
        constructor(name, func) {
            this.Name = name
            this.Func = func
        }
    }

    let pruchaseFuncs = [
        new PurchaseFunc(shopItemsTemp[0].Name, PurchaseClicker),
        new PurchaseFunc(shopItemsTemp[1].Name, PurchaseClickerSpeed),
        new PurchaseFunc(shopItemsTemp[2].Name, PurchaseClickerStrengh),
        new PurchaseFunc(shopItemsTemp[3].Name, PurchaseHighlight),
        new PurchaseFunc(shopItemsTemp[4].Name, PurchaseCompleter),
        new PurchaseFunc(shopItemsTemp[5].Name, PurchaseIncrease4x4),
    ]

    function collect(name, value, size, squares) {

        let tempResources = resources

        tempResources.find(resource => resource.Name == name).Value = CollectResources(name, value * (size * size))

        props.setResources([...tempResources])
        NewGame(size, squares)
    }

    function NewSolve(solve) {
        if (solve == null) {
            return
        }

        let tempResources = resources
        let name = `${size}x${size}`
        tempResources.find(resource => resource.Name == name).Value = CollectResources(name, Amounts[1])
        props.setResources([...tempResources])

        let tempGameBoard = [...gameBoard]
        tempGameBoard[solve[0]][solve[1]] = String(solve[2] + "og")
        SetGameBoard(tempGameBoard)
        SaveBoard(tempGameBoard, `${props.id}curBoard`)
    }

    return (
        <div>
            <div className="game">
                <div>
                    <div className="sudoku">
                        <Sudoku
                            size={size}
                            squares={squares}
                            callBack={props.handleClick}
                            amount={Amounts[1]}
                            value={gameBoard}
                            gameBoard={gameBoard}
                            setGameBoard={SetGameBoard}
                            id={props.id}
                        ></Sudoku>
                        <Complete
                            solved={solved}
                            newGame={NewGame}
                            squares={squares}
                            size={size}
                            collect={collect}
                            clickBar={clickBar}
                            fillbar={FillBar}
                            clickAmount={Amounts[0]}
                            collectAmount={Amounts[1]}
                            duration={Intervals[0]}
                            actives={Actives[0]}
                        ></Complete>
                    </div>
                </div>
                <div className="shopDiv">
                    <Shop
                        resources={resources}
                        pruchaseFuncs={pruchaseFuncs}
                        name={size + "x" + size}
                        id={props.id}
                        items={shopItemsTemp}
                    ></Shop>
                </div>
            </div>
        </div>
    )
}

function useInterval(callBack, amount, active, interval) {
    const savedCallback = useRef();

    useEffect(() => {
        savedCallback.current = callBack;
    })

    useEffect(() => {
        if (active) {
            function tick() {
                savedCallback.current(amount);
            }

            let id = setInterval(tick, interval);
            return () => clearInterval(id);
        }
    });
}