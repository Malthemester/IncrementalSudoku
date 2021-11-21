import './App.css';
import Sudoku from './Components/sudoku'
import NumberInput from './Components/numberInput'
import Complete from './Components/complete'
import Header from './Components/header'
import DisplayResources from './Components/resources'
import { MakeSudoku, RemoveNumbers, CheckSukoku } from './HelperFunctions/generatorSudoku'
import { useEffect, useState, useRef } from "react"
import { SaveBoard, LocalToArray, LoadResources, SaveResources } from './HelperFunctions/saveValue'
import { CollectResources } from './HelperFunctions/getResources'
import { Shop, shopItems } from './Components/shop'
import { SolveOne } from './HelperFunctions/solve'

let seleNumber = 1

function App() {
	let remove = 9
	let size = 4
	let squares = 2

	class Resource {
		Name = "name"
		Value = 0
		Interval = 0
		AmountPar = 0
		Display = false

		constructor(name, value, interval, amountPar, display) {
			this.Name = name
			this.Value = value
			this.Interval = interval
			this.AmountPar = amountPar
			this.Display = display
		}
	}

	let currencys =
		[
			new Resource("4x4", 0, 0, 0, true),
			new Resource("9x9")
		]

	const [selectedNumber, SetSelectedNumber] = useState(seleNumber)
	const [gameBoard, SetGameBoard] = useState(Array(size).fill(Array(size).fill(null)))
	const [resources, SetResources] = useState(currencys)
	const [solved, SetSolved] = useState(false)
	const [FillBar, SetFillBar] = useState(0)
	const [Amounts, SetAmounts] = useState([1, 1])
	const [Actives, SetActives] = useState([false, false])
	const [Intervals, SetIntervals] = useState([1000])

	useEffect(() => {
		GetIncrementels()

		let savedBoard = localStorage.getItem("curBoard")
		if (savedBoard != null) {

			let curBoard = LocalToArray(savedBoard)
			SetGameBoard(curBoard)
		}
		else {
			NewGame(size, squares);
		}
		SetResources(LoadAllResources())
	}, [])


	useEffect(() => {
		SetSolved(CheckSukoku(size, gameBoard, squares))
	}, [gameBoard])

	useInterval(clickBar, Amounts[0], Actives[0], Intervals[0])

	useEffect(() => {
		if (Actives[1] && solved)
			collect("4x4",Amounts[1],size,squares)
	}, [solved])

	function GetIncrementels() {
		let shop = shopItems
		let tempActives = Actives
		let tempIntervals = Intervals
		let tempAmounts = Amounts
		
		tempActives[0] = LoadResources(shop[0].Name) > 0
		tempIntervals[0] = shop[1].IncremenAmount(LoadResources(shop[1].Name))
		tempAmounts[0] = shop[2].IncremenAmount(LoadResources(shop[2].Name))
		tempActives[1] = LoadResources(shop[3].Name) > 0
		tempAmounts[1] = shop[4].IncremenAmount(LoadResources(shop[4].Name))
		
		SetIntervals(tempIntervals)
		SetActives(tempActives)
		SetAmounts(tempAmounts)
	}

	function NewGame(size, squares) {
		let newBoard = MakeSudoku(size, squares)
		newBoard = RemoveNumbers(newBoard, remove)
		SetGameBoard(newBoard)
		SaveBoard(newBoard, "curBoard")
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

		SetResources([...tempResources])
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
				NewSolve(SolveOne(gameBoard))
			}
		}
		else
			SetFillBar(tempFill)
	}

	class PruchaseFunc {
		constructor(name, func) {
			this.Name = name
			this.Func = func
		}
	}

	let pruchaseFuncs = [
		new PruchaseFunc(shopItems[0].Name, PurchaseClicker),
		new PruchaseFunc(shopItems[1].Name, PurchaseClickerSpeed),
		new PruchaseFunc(shopItems[2].Name, PurchaseClickerStrengh),
		new PruchaseFunc(shopItems[3].Name, PurchaseCompleter),
		new PruchaseFunc(shopItems[4].Name, PurchaseIncrease4x4)
	]

	function LoadAllResources() {
		currencys.map((currency, index, currencys) => {
			currencys[index].Value = LoadResources(currency.Name)
		})

		return currencys
	}

	function collect(name, value, size, squares) {

		let tempResources = resources

		tempResources.find(resource => resource.Name == name).Value = CollectResources(name, value)

		SetResources(tempResources)
		NewGame(size, squares)
	}

	function handleClick(x, y) {
		if (gameBoard == null) {
			return
		}
		let tempGameBoard = [...gameBoard]
		tempGameBoard[x][y] = String(seleNumber)
		SetGameBoard(tempGameBoard)
		SaveBoard(tempGameBoard, "curBoard")
	}

	function NewSolve(solve) {
		if (solve == null) {
			return
		}
		let tempGameBoard = [...gameBoard]
		tempGameBoard[solve[0]][solve[1]] = String(solve[2] + "og")
		SetGameBoard(tempGameBoard)
		SaveBoard(tempGameBoard, "curBoard")
	}

	const handleNumberClick = (number) => {
		seleNumber = number.target.value
		SetSelectedNumber(number.target.value)
	}

	useEffect(() => {
		const handleInput = (e) => {
			if (e.key <= size && e.key != 0) {
				SetSelectedNumber(e.key)
				seleNumber = e.key
			}
		}
		document.addEventListener("keydown", handleInput);

		return () => {
			document.removeEventListener("keydown", handleInput);
		};
	}, []);

	return (
		<div>
			<Header></Header>
			<div className="game">
				<div>
					<DisplayResources resources={resources} ></DisplayResources>
					<NumberInput selectedNumber={selectedNumber} size={size} callBack={handleNumberClick} />
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
					<Shop resources={resources} pruchaseFuncs={pruchaseFuncs}></Shop>
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

export default App;