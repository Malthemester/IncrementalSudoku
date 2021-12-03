import './App.css';
import NumberInput from './Components/numberInput'
import { useEffect, useState, useRef } from "react"
import { Board } from "./Components/board"
import Header from './Components/header'
import DisplayResources from './Components/resources'
import { SaveBoard, LoadResources, SaveResources } from './HelperFunctions/saveValue'
import { Shop, gobalShopItems } from './Components/shop'
import { IsInSolve } from './HelperFunctions/solve'
import { CollectResources } from './HelperFunctions/getResources'

let seleNumber = 1

export default function App(paams) {
	let id = "0#"

	class Resource {
		Name = "name"
		Value = 0
		Interval = 0
		AmountPar = 0
		Display = false

		constructor(name, value, interval, incremenAmount, display) {
			this.Name = name
			this.Value = value
			this.Interval = interval
			this.IncremenAmount = incremenAmount
			this.Display = display
		}
	}

	let currencys =
		[
			new Resource("4x4", 0, 0, 0, true),
			new Resource("9x9", 0, 0, 0, false)
		]

	const [resources, SetResources] = useState(currencys)
	const [selectedNumber, SetSelectedNumber] = useState(seleNumber)
	const [GobalsActives, SetGobalsActives] = useState([false])

	useEffect(() => {
		SetResources([...LoadAllResources()])
		GetIncrementels()
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

	function GetIncrementels() {
		let tempActives = GobalsActives

		tempActives[0] = LoadResources(id + gobalShopItemsTemp[0].Name) > 0

		SetGobalsActives(tempActives)
	}

	function LoadAllResources() {
		currencys.map((currency, index, currencys) => {
			currencys[index].Value = LoadResources(currency.Name)
			if (currencys[index].Value > 0)
				currencys[index].Display = true
		})

		return currencys
	}

	const handleNumberClick = (number) => {
		seleNumber = number.target.value
		SetSelectedNumber(number.target.value)
	}

	function handleClick(x, y, gameBoard, SetGameBoard, id, amount) {
		if (gameBoard == null || gameBoard.lengt >= seleNumber) {
			return
		}
		let tempGameBoard = [...gameBoard]
		if (IsInSolve(id, `${x}${y}${seleNumber}`, gameBoard)) {
			let tempResources = resources
			let name = `${gameBoard.length}x${gameBoard.length}`

			tempResources.find(resource => resource.Name == name).Value = CollectResources(name, amount)

			SetResources([...tempResources])
		}
		tempGameBoard[x][y] = String(seleNumber)
		SetGameBoard([...tempGameBoard])
		SaveBoard(tempGameBoard, id + "curBoard")

	}

	let gobalShopItemsTemp = gobalShopItems()

	class PurchaseFunc {
		constructor(name, func) {
			this.Name = name
			this.Func = func
		}
	}

	let pruchaseFuncs = [
		new PurchaseFunc(gobalShopItemsTemp[0].Name, Purchase9x9),
	]

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

		SetResources([...tempResources])
	}

	function Purchase9x9(costs, keyName, max, id) {
		Purchase(costs, id + keyName, max)
		let tempActive = GobalsActives
		tempActive[0] = true
		let tempResources = resources
		tempResources[1].Display = true
		SetResources([...tempResources])
		SetGobalsActives([...tempActive])
	}

	return (
		<div>
			<Header></Header>

			<DisplayResources resources={resources} ></DisplayResources>
			<NumberInput selectedNumber={selectedNumber} size={GobalsActives[0] ? 9 : 4} callBack={handleNumberClick} />

			<div className="gameshop">

				<div >
					<Board
						id={"1#"}
						size={4}
						squares={2}
						remove={7}
						resources={resources}
						setResources={SetResources}
						handleClick={handleClick}
						currencys={currencys}
					></Board>

					{
						GobalsActives[0] ?
							<Board
								id={"2#"}
								size={9}
								squares={3}
								remove={45}
								resources={resources}
								setResources={SetResources}
								handleClick={handleClick}
								currencys={currencys}
							></Board>
							: null
					}
				</div>
				<div>
					<Shop
						resources={resources}
						pruchaseFuncs={pruchaseFuncs}
						name={"Global Shop"}
						id={id}
						items={gobalShopItemsTemp}
					></Shop>
				</div>
			</div>

		</div>
	)

}