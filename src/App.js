import './App.css';
import Sudoku from './Components/sudoku'
import NumberInput from './Components/numberInput'
import Complete from './Components/complete'
import { MakeSudoku, RemoveNumbers, CheckSukoku } from './HelperFunctions/generatorSudoku'
import { useEffect, useState, useRef } from "react"
import Header from './Components/header'
import DisplayResources from './Components/resources'
import { SaveBoard, LocalToArray, LoadResources, SaveResources } from './HelperFunctions/saveValue'
import { CollectResources } from './HelperFunctions/getResources'
import Shop from './Components/shop'
// import {Interval, useInterval} from './HelperFunctions/interval'
import { SolveOne } from './HelperFunctions/solve'

let seleNumber = 1

function App() {
	let remove = 2
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

	class Incrementel {
		constructor(name, interval, amount, callBack, active) {
			this.Name = name
			this.Interval = interval
			this.Amount = amount
			this.CallBack = callBack
			this.Active = active
		}
	}

	let incrementelsArr = [
		new Incrementel("clicker", 50, 0.5, clickBar, false),
		new Incrementel("consloe", 1500, 2, consloeTest, true)
	]


	const [selectedNumber, SetSelectedNumber] = useState(seleNumber)
	const [gameBoard, SetGameBoard] = useState(Array(size).fill(Array(size).fill(null)))
	const [resources, SetResources] = useState(currencys)
	const [solved, SetSolved] = useState(false)
	const [FillBar, SetFillBar] = useState(0)
	const [Amount, SetAmount] = useState(1)
	const [Active, SetActive] = useState([incrementelsArr[0].Active, incrementelsArr[1].Active])

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

	useEffect(() => {
		SetSolved(CheckSukoku(size, gameBoard, squares))
	}, [resources])

	function GetIncrementels() {
		let clicker = LoadResources("clicker")
		let temtActive = Active
		temtActive[0] = clicker != 0 ? true : false

		SetActive(temtActive)
	}

	function NewGame(size, squares) {
		let newBoard = MakeSudoku(size, squares)
		newBoard = RemoveNumbers(newBoard, remove)
		SetGameBoard(newBoard)
		SaveBoard(newBoard, "curBoard")
	}


	function consloeTest() {
		console.log("cool")
	}
	let incrementel1 = new Incrementel("clicker", 50, 0.5, clickBar, true)


	function PurchaseClicker() {
		let temtActive = Active

		temtActive[0] = true

		SaveResources("clicker",true)
		SetActive(temtActive)
	}

	useInterval(incrementelsArr[0], Amount, Active[0])

	incrementel1.Amount = 1

	class pruchaseFunc {
		constructor(name, func) {
			this.Name = name
			this.Func = func
		}
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

	let pruchaseFuncs = [
		new pruchaseFunc("Clicker", PurchaseClicker)
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
		tempGameBoard[solve[0]][solve[1]] = String(solve[2])
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

function useInterval(inc, amount, active) {
	const savedCallback = useRef();

	useEffect(() => {
		savedCallback.current = inc.CallBack;
	})

	useEffect(() => {
		if (active) {
			function tick() {
				savedCallback.current(amount);
			}

			let id = setInterval(tick, inc.Interval);
			return () => clearInterval(id);
		}
	} );
}



export default App;