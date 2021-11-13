import './App.css';
import Sudoku from './Components/sudoku'
import NumberInput from './Components/numberInput'
import Solved from './Components/complete'
import { MakeSudoku, RemoveNumbers, CheckSukoku } from './HelperFunctions/generatorSudoku'
import { useEffect, useState } from "react"
import Header from './Components/header'
import DisplayResources from './Components/resources'
import { SaveBoard, LocalToArray, LoadResources } from './HelperFunctions/saveValue'
import { CollectResources } from './HelperFunctions/getResources'

let seleNumber = 1

function App() {
	let remove = 7
	let size = 4
	let squares = 2

	const resourcesObj = {
		x4: 0,
		x9: -1,

		x4PM: 0,
		x9PM: 0
	}

	const resourcesDisplayObj = {
		x4: true,
		x9: false,
	}

	let unSolvedBoard = []

	const [selectedNumber, SetSelectedNumber] = useState(seleNumber)
	const [gameBoard, SetGameBoard] = useState(Array(size).fill(Array(size).fill(null)))
	const [resources, SetResources] = useState(resourcesObj)
	const [solved, SetSolved] = useState(false)

	useEffect(() => {
		SetSolved(CheckSukoku(size, gameBoard, squares))
	}, [gameBoard])

	useEffect(() => {
		SetSolved(CheckSukoku(size, gameBoard, squares))
	}, [resources])


	function NewGame(size, squares) {
		let newBoard = MakeSudoku(size, squares)
		newBoard = RemoveNumbers(newBoard, remove)
		unSolvedBoard = newBoard
		SetGameBoard(newBoard)
		SaveBoard(newBoard, "curBoard")
	}

	function LoadAllResources() {
		let tempResources = resources

		if (resourcesDisplayObj.x4)
			tempResources.x4 = LoadResources("x4")

		if (resourcesDisplayObj.x9)
			tempResources.x9 = LoadResources("x9")

		return tempResources
	}

	function collect(key, value, size, squares) {

		let tempResources = resources

		tempResources[`${key}`] = CollectResources(key, value)

		SetResources(tempResources)
		NewGame(size, squares)
	}

	useEffect(() => {
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

	function handleClick(x, y) {
		if (gameBoard == null) {
			return
		}
		let tempGameBoard = [...gameBoard]
		tempGameBoard[x][y] = String(seleNumber)
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
				<DisplayResources resources={resources} ></DisplayResources>
				<NumberInput selectedNumber={selectedNumber} size={size} callBack={handleNumberClick} />
				<div>
					<div className="sudoku" >
						<Sudoku
							size={size}
							squares={squares}
							callBack={handleClick}
							value={gameBoard}
						></Sudoku>
						<Solved solved={solved} newGame={NewGame} squares={squares} size={size} collect={collect}></Solved>
					</div>
				</div>

			</div>
		</div>
	)
}

export default App;
