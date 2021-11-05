function RenderInputFild(props) {
	let radioGroup = []

	radioGroup.push(
		<input
			key={"input" + props.value}
			type={"radio"}
			id={"num" + props.value}
			name={"radioNumber"}
			value={props.value}
			checked={props.selectedNumber == props.value}
			onChange={props.callBack}
		/>
	)

	radioGroup.push(<label key={"labl" + props.value} htmlFor={"num" + props.value}> {props.value} </label>)

	return radioGroup
}

function RenderNInput(props) {
	let buttons = []
	for (let i = 0; i < props.size; i++) {
		buttons.push(<RenderInputFild selectedNumber={props.selectedNumber} callBack={props.callBack} value={i + 1} />)
	}

	return <div className="radio-toolbar"> {buttons} </div>
}

export default function NumberInput(props) {
	return (
		<div>
			<RenderNInput selectedNumber={props.selectedNumber} size={props.size} callBack={props.callBack} />
		</div>
	)
}