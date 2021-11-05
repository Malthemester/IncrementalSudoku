import { useEffect, useState } from "react";

export default function Sudoku(props) {
	const [board, SetBoard] = useState()
	let rows = []
	let squ = []
	let colGroup = []

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
				tds.push(<td key={`tdK${i}${j}`} onClick={
					() => props.callBack(i, j)}>
					{props.value[i][j]}
				</td>)
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
		<table>
			{board}
		</table>
	)
}