import Sudoku from './sudoku'
import Complete from './complete'

import { MakeSudoku, RemoveNumbers, CheckSukoku } from '../HelperFunctions/generatorSudoku'
import { useEffect, useState, useRef } from "react"
import { SaveBoard, LocalToArray, LoadResources, SaveResources } from '../HelperFunctions/saveValue'
import { CollectResources } from '../HelperFunctions/getResources'
import { Shop, shopItems } from './shop'
import { SolveOne } from '../HelperFunctions/solve'

export function Board(props) {
    let size = props.size
    let squares = props.squares
    let remove = props.remove
    let resources = props.resources

	// {remove, size, squares, resources, setResources}
	const [gameBoard, SetGameBoard] = useState(Array(size).fill(Array(size).fill(null)))
	const [solved, SetSolved] = useState(false)
	const [FillBar, SetFillBar] = useState(0)
	const [Amounts, SetAmounts] = useState([1, 1])
	const [Actives, SetActives] = useState([false, false])
	const [Intervals, SetIntervals] = useState([1000])

	useEffect(() => {
		GetIncrementels()

		let savedBoard = localStorage.getItem(props.id + "curBoard")
		if (savedBoard != null) {

			let curBoard = LocalToArray(savedBoard)
			SetGameBoard(curBoard)
		}
		else {
			NewGame(size, squares);
		}
		props.setResources(LoadAllResources())
	}, [])


	useEffect(() => {
		SetSolved(CheckSukoku(size, gameBoard, squares))
	}, [gameBoard])

	useInterval(clickBar, Amounts[0], Actives[0], Intervals[0])

	useEffect(() => {
		if (Actives[1] && solved)
			collect(`${size}x${size}`,Amounts[1],size,squares)
	}, [solved])

	function GetIncrementels() {
		let shop = shopItems
		let tempActives = Actives
		let tempIntervals = Intervals
		let tempAmounts = Amounts
		
		tempActives[0] = LoadResources(props.id + shop[0].Name) > 0
		tempIntervals[0] = shop[1].IncremenAmount(LoadResources(props.id +shop[1].Name))
		tempAmounts[0] = shop[2].IncremenAmount(LoadResources(props.id +shop[2].Name))
		tempActives[1] = LoadResources(props.id +shop[3].Name) > 0
		tempAmounts[1] = shop[4].IncremenAmount(LoadResources(props.id +shop[4].Name))
		
		SetIntervals(tempIntervals)
		SetActives(tempActives)
		SetAmounts(tempAmounts)
	}

	function NewGame(size, squares) {
		let newBoard = MakeSudoku(size, squares)
		newBoard = RemoveNumbers(newBoard, remove, props.id)
		SetGameBoard(newBoard)
		SaveBoard(newBoard, `${props.id}curBoard`)
	}


	function Purchase(costs, keyName, max) {
		let tempMax = LoadResources(keyName)
		SaveResources(keyName, tempMax + 1)

		let tempResource = LoadResources(keyName)
		if (tempResource >= max) {
			return
		}

		let tempResources = resources

		costs.forEach(price => {
			let resourceIndex = tempResources.findIndex(resource => resource.Name == price[0])
			tempResources[resourceIndex].Value = tempResources[resourceIndex].Value - price[1]
			SaveResources(price[0], tempResources[resourceIndex].Value)
		})

		props.setResources([...tempResources])
	}

	function PurchaseClicker(cost, keyName, max) {
		Purchase(cost, keyName, max)
		let tempActive = Actives
		tempActive[0] = true
		SetActives([...tempActive])
	}

	function PurchaseClickerSpeed(cost, keyName, max) {
		Purchase(cost, keyName, max)
		let purchaseAmount = LoadResources(keyName)

		let tempIntervals = Intervals
		tempIntervals[0] = shopItems[1].IncremenAmount(purchaseAmount)

		SetIntervals([...tempIntervals])
	}

	function PurchaseClickerStrengh(cost, keyName, max) {
		Purchase(cost, keyName, max)

		let purchaseAmount = LoadResources(keyName)
		let tempAmounts = Amounts
		tempAmounts[0] = shopItems[2].IncremenAmount(purchaseAmount)
		SetAmounts([...tempAmounts])
	}

	function PurchaseCompleter(cost, keyName, max) {
		Purchase(cost, keyName, max)
		let tempActive = Actives
		tempActive[1] = true
		SetActives([...tempActive])
	}

	function PurchaseIncrease4x4(cost, keyName, max) {
		Purchase(cost, keyName, max)

		let purchaseAmount = LoadResources(keyName)
		let tempAmounts = Amounts
		tempAmounts[1] = shopItems[4].IncremenAmount(purchaseAmount)
		SetAmounts([...tempAmounts])
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
		new PurchaseFunc(shopItems[0].Name, PurchaseClicker),
		new PurchaseFunc(shopItems[1].Name, PurchaseClickerSpeed),
		new PurchaseFunc(shopItems[2].Name, PurchaseClickerStrengh),
		new PurchaseFunc(shopItems[3].Name, PurchaseCompleter),
		new PurchaseFunc(shopItems[4].Name, PurchaseIncrease4x4)
	]

	function LoadAllResources() {
		props.currencys.map((currency, index, currencys) => {
			props.currencys[index].Value = LoadResources(currency.Name)
		})

		return props.currencys
	}

	function collect(name, value, size, squares) {

		let tempResources = resources

		tempResources.find(resource => resource.Name == name).Value = CollectResources(name, value)

		props.setResources(tempResources)
		NewGame(size, squares)
	}

	function handleClick(x, y) {
		if (gameBoard == null) {
			return
		}
		let tempGameBoard = [...gameBoard]
		tempGameBoard[x][y] = String(props.selectedNumber)
		SetGameBoard(tempGameBoard)
		SaveBoard(tempGameBoard, `${props.id}curBoard`)
	}

	function NewSolve(solve) {
		if (solve == null) {
			return
		}
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
							callBack={handleClick}
							value={gameBoard}
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
						></Complete>
					</div>
				</div>
				<div>
					<Shop resources={resources} pruchaseFuncs={pruchaseFuncs} size={size}></Shop>
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