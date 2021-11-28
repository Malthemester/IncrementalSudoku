import cursor from '../pointer.png';


export default function DesplaySolved(props) {

    const fill = {
        backgroundColor: "crimson",
        width: `${props.fillbar}%`,
        height: "100%",
        cursor: "pointer"
    }

    const clicker = {
        animationDuration: `${props.duration}`,
        margenTop: "8px",
        width: "21px",
        height: "17px"
      }

    const clickerSize = {
        margenTop: "8px",
        width: "21px",
        height: "17px"
      }

    return (
        <div className="buttonList">
            {props.solved ?
                <button className="button" type="button" onClick={() => props.collect(props.size + "x" + props.size, props.collectAmount, props.size, props.squares)}>Complete</button> :
                <button className="button" type="button" disabled>Incomplete</button>}

            <button className="button" type="button" onClick={() => props.newGame(props.size, props.squares)}>New Sudoku</button>

            <div className="gameshop">

                <div id="Barfill" onClick={() => props.clickBar(props.clickAmount)}>
                    <div style={fill}></div>

                </div>
                <div className="wapper">
                    <img className={props.actives ? "clicker clickerSize": "clickerSize"}  style={{animationDuration: `${props.duration}ms`}} src={cursor}></img>
                </div>
            </div>
        </div>
    )
}