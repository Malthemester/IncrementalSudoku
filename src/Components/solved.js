

export default function DesplaySolved(props) {
    return (
        <div className="buttonList">
                {props.solved?
            <button className="button" type="button">Complete</button>:
            <button className="button" type="button" disabled>Incomplete</button>}

            <button className="button" type="button" onClick={() => props.newGame(4,2)}>New Sudoku</button>
            
        </div>
    )
}