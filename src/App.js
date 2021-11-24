import './App.css';
import NumberInput from './Components/numberInput'
import { useEffect, useState, useRef } from "react"
import { Board } from "./Components/board"
import Header from './Components/header'
import DisplayResources from './Components/resources'
import { SaveBoard, LoadResources } from './HelperFunctions/saveValue'

let seleNumber = 1

export default function App(paams) {
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
			new Resource("9x9", 0, 0, 0, true)
		]

	const [resources, SetResources] = useState(currencys)
	const [selectedNumber, SetSelectedNumber] = useState(seleNumber)

	useEffect(() => {
		SetResources(LoadAllResources())
	}, [])

	useEffect(() => {
		const handleInput = (e) => {
			if (e.key <= 9 && e.key != 0) {
				seleNumber = e.key
				SetSelectedNumber(e.key)
			}
		}
		document.addEventListener("keydown", handleInput);

		return () => {
			document.removeEventListener("keydown", handleInput);
		};
	}, []);

	function LoadAllResources() {
		currencys.map((currency, index, currencys) => {
			currencys[index].Value = LoadResources(currency.Name)
		})

		return currencys
	}

	const handleNumberClick = (number) => {
		seleNumber = number.target.value
		SetSelectedNumber(number.target.value)
	}

	function handleClick(x, y, gameBoard, SetGameBoard, id) {
		if (gameBoard == null) {
			return
		}
		let tempGameBoard = [...gameBoard]
		tempGameBoard[x][y] = String(seleNumber)
		SetGameBoard([...tempGameBoard])
		SaveBoard(tempGameBoard, id + "curBoard")
	}

	return (
		<div>
			<Header></Header>

			<DisplayResources resources={resources} ></DisplayResources>
			<NumberInput selectedNumber={selectedNumber} size={9} callBack={handleNumberClick} />

			<Board
				id={"1#"}
				size={4}
				squares={2}
				remove={9}
				resources={resources}
				setResources={SetResources}
				handleClick={handleClick}
				currencys={currencys}
			></Board>

			<Board
				id={"2#"}
				size={9}
				squares={3}
				remove={1}
				resources={resources}
				setResources={SetResources}
				handleClick={handleClick}
				currencys={currencys}
			></Board>
		</div>
	)

}