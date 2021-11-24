import { SolveOne } from '../HelperFunctions/solve'


export default function DesplaySolved(props) {

    const fill = {
        backgroundColor: "crimson",
        width: `${props.fillbar}%`,
        height: "100%",
        cursor: "pointer"
    }

    return (
        <div className="buttonList">
            {props.solved ?
                <button className="button" type="button" onClick={() => props.collect(props.size + "x" + props.size, props.collectAmount, props.size, props.squares)}>Complete</button> :
                <button className="button" type="button" disabled>Incomplete</button>}

            <button className="button" type="button" onClick={() => props.newGame(props.size, props.squares)}>New Sudoku</button>

            <div id="Barfill" onClick={() => props.clickBar(props.clickAmount)}>
                <div style={fill}> </div>
            </div>
        </div>
    )
}