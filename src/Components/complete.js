import { SolveOne } from '../HelperFunctions/solve'


export default function DesplaySolved(props) {

    const fill = {
        backgroundColor: "crimson",
        width: `${props.fillbar}%`,
        height: "100%"
    }


    function clickBar(barFill, solved) {
        let tempFill = props.fillbar + barFill

        if (tempFill >= 100) {
            if (solved) {
                props.setFillBar(100)
            }
            else{
                props.setFillBar(0)
                props.setboard(SolveOne(props.board))
            }
        }
        else
            props.setFillBar(tempFill)
    }

    return (
        <div className="buttonList">
            {props.solved ?
                <button className="button" type="button" onClick={() => props.collect("4x4", 1, props.size, props.squares)}>Complete</button> :
                <button className="button" type="button" disabled>Incomplete</button>}

            <button className="button" type="button" onClick={() => props.newGame(props.size, props.squares)}>New Sudoku</button>

            <div id="Barfill" onClick={() => props.clickBar(5)}>
                <div style={fill} > </div>
            </div>
        </div>
    )
}