import { useEffect, useState } from "react";

export default function Sudoku(props) {
	const [board, SetBoard] = useState()
	let rows = []
	let squ = []
	let colGroup = []

	const bold = {
		fontWeight: 'bold',
		cursor: "default"
	}

	function getFild(value, i, j, callBack) {

		value = String(value)


		if (value != null && value.includes("h")) { 
			return (
				<td className="highlight" key={`tdK${i}${j}`}  onClick={() => callBack(i, j, props.gameBoard, props.setGameBoard, props.id, props.amount)}>
					{value.replace('h', '')}
				</td>)
		}
		else if (value != null && value.includes("og")) {
			return (
				<td style={bold} key={`tdK${i}${j}`}>
					{value.replace('og', '')}
				</td>)
		}
		else {
			return (
				<td key={`tdK${i}${j}`} onClick={() => callBack(i, j, props.gameBoard, props.setGameBoard, props.id, props.amount)}>
					{value}
				</td>)
		}
	}

	useEffect(() => {
		for (let i = 0; i < props.squares; i++) {
			squ.push(<col key={'colG' + i} />)
		}

		for (let i = 0; i < (props.size / props.squares); i++) {
			rows.push(<colgroup key={'colG' + i}>{squ}</colgroup>)
		}

		let cusKey = 0

		for (let i = 0; i < props.size; i++) {
			let tds = []

			for (let j = 0; j < props.size; j++) {
				tds.push(getFild(props.value[i][j], i, j, props.callBack))
			}
			colGroup.push(<tr key={'trK' + i}>{tds}</tr>)

			if (i % props.squares == props.squares - 1) {
				rows.push(<tbody key={'tb' + i}>{colGroup}</tbody>)
				colGroup = []
			}
			SetBoard(rows)

		}
	}, [props.value])

	return (
		<table className="sudokuTable">
			{board}
		</table>
	)
}