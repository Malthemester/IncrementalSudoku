import { useState } from "react"

export default function DesplaySolved(props) {

    const [fillBar, SetFillBar] = useState(0)

    const fill = {
        backgroundColor: "crimson",
        width: `${fillBar}%`,
        height: "100%"
    }

    function clickBar(barFill) {
        let tempFill = fillBar + barFill

        if (tempFill >= 100) {
            SetFillBar(100)
        }
        else
            SetFillBar(tempFill)
    }

    return (
        <div className="buttonList">
            {props.solved ?
                <button className="button" type="button" onClick={() => props.collect("x4", 1, props.size, props.squares)}>Complete</button> :
                <button className="button" type="button" disabled>Incomplete</button>}

            <button className="button" type="button" onClick={() => props.newGame(props.size, props.squares)}>New Sudoku</button>

            <div id="Barfill" onClick={() => clickBar(5)}>
                <div style={fill} > </div>
            </div>
        </div>
    )
}